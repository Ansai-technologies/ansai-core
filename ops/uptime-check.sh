#!/usr/bin/env bash
# Independent uptime watch for Ansai Technologies.
# Runs on GitHub Actions (every 30 min) — NOT on Muse's runtime — so it keeps
# watching even if Muse is down, offline, or out of usage.
#
# What it does each run:
#   1. Probes the five targets (retry once after 10s on failure).
#   2. Reads previous per-target states from the <!-- states: ... --> comment
#      in ops/uptime-status.md (missing comment/file = UNKNOWN).
#   3. Regenerates ops/uptime-status.md with a table + a fresh states comment.
#   4. Appends to ops/uptime-log.md ONLY on transitions:
#        - UNKNOWN->UP is not a transition (not logged)
#        - UNKNOWN->DOWN and UP->DOWN are transitions (logged + alerted)
#        - DOWN->UP is a transition (logged, matching issue closed)
#   5. Commits + pushes the ops/ changes to main.
#   6. Alerts: opens a GitHub issue (label `uptime`) per target currently DOWN
#      with no already-open matching issue; comments + closes matching issues
#      when a target recovers.
#
# Dependencies on the runner: curl, jq, gh (all present on ubuntu-latest).
set -u

STATUS_FILE="ops/uptime-status.md"
LOG_FILE="ops/uptime-log.md"

TARGETS=(
  "looply-site|https://looply.ansaitechnologies.co.ke/|http200"
  "looply-api|https://looply.ansaitechnologies.co.ke/api/health|http200-body-ok"
  "ops-mirror|https://ops.looply.ansaitechnologies.co.ke/|http200"
  "beautify-preview|https://beautify-preview.ansaitechnologies.co.ke/|http200"
  "wincost-prototype|https://wincost.ansaitechnologies.co.ke/|http200"
)

utc_now="$(date -u '+%Y-%m-%d %H:%M UTC')"
eat_now="$(TZ=Africa/Nairobi date '+%Y-%m-%d %H:%M EAT')"

# check_one <name> <url> <mode> -> "STATUS|CODE|NOTE"
check_one() {
  local name="$1" url="$2" mode="$3"
  local code attempt body_file note
  body_file="$(mktemp)"
  attempt=1
  while [ "$attempt" -le 2 ]; do
    code="$(curl -sS -o "$body_file" -w '%{http_code}' --max-time 20 "$url" 2>/dev/null || true)"
    [ -z "$code" ] && code="000"
    if [ "$mode" = "http200" ]; then
      if [ "$code" = "200" ]; then
        echo "UP|$code|"; rm -f "$body_file"; return 0
      fi
    else
      if [ "$code" = "200" ] && grep -q '"status"' "$body_file" 2>/dev/null && grep -q 'ok' "$body_file" 2>/dev/null; then
        echo "UP|$code|"; rm -f "$body_file"; return 0
      fi
    fi
    if [ "$attempt" -eq 1 ]; then sleep 10; fi
    attempt=$((attempt + 1))
  done
  if [ "$code" = "000" ]; then
    note="connection failed (timeout or DNS)"
  elif [ "$code" = "200" ]; then
    note="body missing status:ok"
  else
    note="unexpected HTTP $code"
  fi
  echo "DOWN|$code|$note"
  rm -f "$body_file"
  return 0
}

# previous states -> "name=UP" tokens, space separated; unknown targets get UNKNOWN
prev_state() {
  local name="$1"
  if [ -f "$STATUS_FILE" ]; then
    local tok
    tok="$(grep -o '<!-- states: .* -->' "$STATUS_FILE" 2>/dev/null | sed -e 's/<!-- states: //' -e 's/ -->//' | tr ' ' '\n' | grep "^${name}=" | head -1 || true)"
    if [ -n "$tok" ]; then
      echo "${tok#*=}"; return 0
    fi
  fi
  echo "UNKNOWN"
}

new_states=()
new_states_notes=()
down_count=0
log_entries=()
alert_down=()   # entries "name|url|code|firstseen"
recoveries=()   # entries "name|url|code"

for t in "${TARGETS[@]}"; do
  name="${t%%|*}"; rest="${t#*|}"
  url="${rest%%|*}"; mode="${rest##*|}"
  result="$(check_one "$name" "$url" "$mode")"
  state="${result%%|*}"; rest2="${result#*|}"
  code="${rest2%%|*}"; note="${rest2##*|}"
  prev="$(prev_state "$name")"
  new_states+=("$name=$state")
  new_states_notes+=("${name}|${url}|${state}|${code}|${note}")

  if [ "$state" = "DOWN" ]; then
    down_count=$((down_count + 1))
    if [ "$prev" != "DOWN" ]; then
      line="- ${eat_now} — ${name} went DOWN (HTTP ${code})"
      [ -n "$note" ] && line="${line} — ${note}"
      log_entries+=("$line")
      alert_down+=("${name}|${url}|${code}|${eat_now}")
    fi
  elif [ "$state" = "UP" ] && [ "$prev" = "DOWN" ]; then
    log_entries+=("- ${eat_now} — ${name} recovered (HTTP ${code})")
    recoveries+=("${name}|${url}|${code}")
  fi
done

# ---- regenerate status file ----
{
  echo "# Uptime watch (independent of Muse)"
  echo
  echo "Runs on GitHub Actions every 30 minutes. Also a standing input to the daily Baraza cycle."
  echo
  echo "Last checked: ${utc_now} (${eat_now})"
  echo
  echo "| Target | URL | Status | HTTP | Notes |"
  echo "|---|---|---|---|---|"
  for e in "${new_states_notes[@]}"; do
    n="${e%%|*}"; r="${e#*|}"
    u="${r%%|*}"; r2="${r#*|}"
    s="${r2%%|*}"; r3="${r2#*|}"
    c="${r3%%|*}"; note="${r3##*|}"
    emoji="🟢"
    [ "$s" = "DOWN" ] && emoji="🔴"
    echo "| ${n} | ${u} | ${emoji} ${s} | ${c} | ${note} |"
  done
  echo
  echo "<!-- states: ${new_states[*]} -->"
} > "$STATUS_FILE"

# ---- append transitions to the log ----
for line in "${log_entries[@]:-}"; do
  echo "$line" >> "$LOG_FILE"
done

# ---- commit + push (main) ----
git config user.name "ansai-uptime-watch"
git config user.email "bot@ansaitechnologies.co.ke"
git checkout -B main >/dev/null 2>&1 || true
git add "$STATUS_FILE" "$LOG_FILE"
summary="all up"
[ "$down_count" -gt 0 ] && summary="$(for e in "${new_states[@]}"; do case "$e" in *=DOWN) echo "${e%%=*} DOWN";; esac; done | tr '\n' ' ' | sed 's/ $//')"
if git status --porcelain | grep -q .; then
  git commit -m "uptime: ${summary}" >/dev/null
  git push origin main
fi

# ---- alerts ----
if [ -n "${GH_TOKEN:-}" ]; then
  gh label create uptime --color B60205 --description "Independent uptime watch" >/dev/null 2>&1 || true

  for e in "${alert_down[@]:-}"; do
    n="${e%%|*}"; r="${e#*|}"
    u="${r%%|*}"; r2="${r#*|}"
    c="${r2%%|*}"; seen="${r2##*|}"
    title="Uptime: ${n} is DOWN"
    existing="$(gh issue list --state open --label uptime --search "${title} in:title" --json number --jq '.[0].number' 2>/dev/null || true)"
    if [ -z "$existing" ] || [ "$existing" = "null" ]; then
      gh issue create --title "$title" --label uptime --body "Target: ${u}
HTTP: ${c}
First seen: ${seen}

This issue was opened by the independent uptime watch (GitHub Actions, every 30 min — not Muse). Transitions are logged in ops/uptime-log.md. The issue is closed automatically when the target recovers." >/dev/null
    fi
  done

  for e in "${recoveries[@]:-}"; do
    n="${e%%|*}"; r="${e#*|}"
    u="${r%%|*}"; c="${r##*|}"
    title="Uptime: ${n} is DOWN"
    num="$(gh issue list --state open --label uptime --search "${title} in:title" --json number --jq '.[0].number' 2>/dev/null || true)"
    if [ -n "$num" ] && [ "$num" != "null" ]; then
      gh issue comment "$num" --body "Recovered at ${eat_now} — HTTP ${c}." >/dev/null
      gh issue close "$num" --reason completed >/dev/null
    fi
  done
fi

echo "uptime-check done: ${summary}"
