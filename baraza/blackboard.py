"""Blackboard tools for the Baraza council.

The blackboard is council/log.md (append-only) + council/state.md, both in the
ansai-core repo. Every agent reads before acting and writes after acting.
History is never rewritten: post() only appends new sections.

Auth: uses the same dynamic-credential pattern as the github skill when running
inside this runtime (credential "custom.github"); falls back to a GITHUB_TOKEN
env var anywhere else. Repo override via BARAZA_REPO (default
Ansai-technologies/ansai-core).
"""
import base64
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime
from zoneinfo import ZoneInfo

REPO = os.getenv("BARAZA_REPO", "Ansai-technologies/ansai-core")
LOG_PATH = "council/log.md"
STATE_PATH = "council/state.md"
EAT = ZoneInfo("Africa/Nairobi")


def now_eat():
    return datetime.now(EAT).strftime("%Y-%m-%d %H:%M EAT")


def _request(path, method="GET", data=None):
    url = "https://api.github.com" + path
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(url, data=body, method=method)
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("User-Agent", "baraza-blackboard")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    if data is not None:
        req.add_header("Content-Type", "application/json")
    # Same dynamic-credential pattern as the github skill; plain token fallback.
    try:
        sys.path.insert(0, "/opt/hatch/skills/skill-creator/bin")
        from dynamic_credentials import add_surrogate_to_request
        add_surrogate_to_request(req, "custom.github",
                                 allowed_hosts=["api.github.com"])
    except Exception:
        token = os.getenv("GITHUB_TOKEN")
        if token:
            req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raise RuntimeError(
            f"{method} {path} -> HTTP {e.code}: "
            f"{e.read().decode(errors='replace')[:300]}")


def _read_file(path):
    f = _request(f"/repos/{REPO}/contents/{path}")
    return base64.b64decode(f["content"]).decode(), f["sha"]


def read_log():
    """Read the full council log (blackboard history)."""
    text, _ = _read_file(LOG_PATH)
    return text


def read_state():
    """Read the shared council state (roster, tracks, rules)."""
    text, _ = _read_file(STATE_PATH)
    return text


def post(entry_markdown, summary_line):
    """Append one timestamped section to council/log.md. Append-only.

    entry_markdown: the section body (without the ## header).
    summary_line: short line used for the commit message.
    Returns the new commit sha.
    """
    current, sha = _read_file(LOG_PATH)
    header = f"## {datetime.now(EAT).strftime('%Y-%m-%d')} — {summary_line}"
    new_text = current.rstrip("\n") + "\n\n" + header + "\n" + entry_markdown.strip() + "\n"
    _request(
        f"/repos/{REPO}/contents/{LOG_PATH}", "PUT",
        {"message": f"Baraza blackboard: {summary_line}",
         "content": base64.b64encode(new_text.encode()).decode(),
         "sha": sha})
    return header


class Blackboard:
    """Object wrapper around the module tools (for agent toolkits)."""

    def read_log(self):
        return read_log()

    def read_state(self):
        return read_state()

    def post(self, entry_markdown, summary_line):
        return post(entry_markdown, summary_line)
