# Independent uptime watch

## What this is and why it exists
A second, independent pair of eyes on Ansai's live properties, running on
**GitHub Actions** (a `schedule` workflow, `*/30 * * * *`) — completely outside
Muse. If the Muse runtime is down, offline, or out of usage, this watch keeps
running on GitHub's infrastructure and keeps alerting.

## Targets
Five properties, defined in `ops/uptime-check.sh` (`TARGETS`):

- **looply-site** — the Looply app homepage (HTTP 200)
- **looply-api** — Looply `/api/health` (HTTP 200 + body contains `"status":"ok"`)
- **ops-mirror** — the Ops Board subdomain mirror (HTTP 200)
- **beautify-preview** — Beautify by Angel preview (HTTP 200)
- **wincost-prototype** — Wincost concept prototype (HTTP 200)

Each check retries once after 10s before calling a target DOWN (curl
`--max-time 20`).

## How alerts work
- A target **DOWN** (with no already-open matching issue) → the workflow opens a
  GitHub issue titled `Uptime: <name> is DOWN` with the `uptime` label,
  containing the URL, HTTP code and first-seen time.
- The issue is **closed automatically** (with a "Recovered at …" comment) when
  the target comes back up.
- **GitHub emails repo watchers on issue events.** The founder should be
  **Watching** `Ansai-technologies/ansai-core` with email notifications on —
  that is the alert channel.
- No test responses, no pings to customers: alerts stay inside this repo.

## Where the Baraza reads it
`ops/uptime-status.md` (current state + last check time) and
`ops/uptime-log.md` (transition-only log) are standing inputs to the daily
Baraza cycle — the council reads these instead of re-probing the sites.

## How to add or remove a target
Edit the `TARGETS` array at the top of `ops/uptime-check.sh` (format
`name|url|mode`, mode is `http200` or `http200-body-ok`). First run after the
edit treats the new target as UNKNOWN; an UNKNOWN first reading is not logged.

## Cost (free tier)
GitHub Actions on a private repo: 2,000 free minutes/month. This workflow is
about one minute per run, every 30 minutes ≈ **1,440 minutes/month** — inside
the free allowance. (If Actions usage ever pinches, drop the cron to
`*/60 * * * *`.)
