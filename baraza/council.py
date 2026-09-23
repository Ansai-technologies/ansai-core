#!/usr/bin/env python3
"""Run one Baraza council cycle.

One cycle = each seat posts its daily async spot-check to the blackboard,
then the chair posts a summary. This is the daily cadence Melchizedek chose:
daily async spot checks per department on the blackboard + a weekly full review
in his timeblock.

Modes:
  DRY_RUN=1 (default)  Full cycle, scripted deliberation, REAL blackboard
                       writes, zero LLM calls. Proves the loop works today.
  DRY_RUN=0            Live mode: each seat deliberates via its Agno agent
                       (needs DEEPSEEK_API_KEY and/or GEMINI_API_KEY).

Usage:
  DRY_RUN=1 python council.py        # from the baraza/ directory
  DRY_RUN=0 python council.py        # live (needs API keys)
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from agents import SEATS, build_council  # noqa: E402
from blackboard import Blackboard, now_eat  # noqa: E402

DRY_RUN = os.getenv("DRY_RUN", "1") == "1"

# Scripted deliberation for DRY_RUN: grounded in the real council state.
SCRIPTED_CHECKS = {
    "Herald": (
        "**Marketing & Sales spot-check** — Studios prospecting campaign draft is "
        "ready to run (inspect loop now validated by the The-Bell deploy). Wincost "
        "Africa deal steady at KSh 60,000, 30/30/40. Next: send Melchizedek the "
        "outreach drafts for approval before anything goes out."
    ),
    "Forge": (
        "**Product & Engineering spot-check** — The-Bell is live on Vercel + "
        "Supabase (PRs #1 and #2 merged; /api/health returns ok). Open: branch "
        "protection is now possible since The-Bell went public; the notices "
        "endpoint against the live database is the one unverified step. Next: "
        "configure branch protection, verify /api/notices, then roll the loop "
        "to the next track."
    ),
    "Atelier": (
        "**Studios spot-check** — Wincost Africa web build is the active client "
        "deliverable. No blockers reported. Next: confirm build milestones against "
        "the 30/30/40 payment schedule and post the content calendar for review."
    ),
    "Ledger": (
        "**Finance & Ops spot-check** — Spend is within the all-serverless Q1 "
        "posture (Vercel Hobby + Supabase free tier). Watch item: model API and "
        "hosting bills as tracks go live; revisit hosting when bills arrive. "
        "KRA: still below the VAT threshold, no action. Next: set a monthly "
        "spend-review reminder."
    ),
    "Vanguard": (
        "**Labs spot-check** — EduManage competitor differentiation is the first "
        "agent research task. The-Bell real Gazette ingestion is queued behind the "
        "deploy. Voltaic consolidation (IES frontend) is landed. Next: start the "
        "EduManage competitor scan and scope the Gazette ingestion source."
    ),
    "Meridian": (
        "**Chair summary** — Cycle complete. Inspect loop is proven on The-Bell "
        "(branch -> review packet -> approval -> merge -> deploy). Assignments: "
        "Herald drafts prospecting outreach for approval; Forge hardens The-Bell "
        "(branch protection, notices verification); Vanguard starts EduManage "
        "competitor research; Ledger watches spend. Nothing here needed an "
        "emergency bypass. Next full review: Melchizedek's weekly timeblock."
    ),
}


def run_dry_cycle(bb):
    lines = [f"_DRY RUN — scripted deliberation, zero LLM calls. {now_eat()}._", ""]
    for seat in SEATS:
        check = SCRIPTED_CHECKS[seat]
        lines.append(f"- **{seat}**: {check}")
        print(f"[{seat}] posted spot-check")
    body = "\n".join(lines)
    header = bb.post(body, "Baraza dry-run cycle (prototype proof)")
    print(f"blackboard <- {header}")
    return header


def run_live_cycle(bb):
    council = build_council()
    log, state = bb.read_log(), bb.read_state()
    lines = [f"_Live council cycle. {now_eat()}._", ""]
    for seat in SEATS:
        agent = council[seat]
        prompt = (
            "Read the blackboard context below, then write your daily async "
            f"spot-check as the {seat} seat: current status in your domain, "
            "anything blocked, and one concrete next action. Keep it to 3-5 "
            "sentences.\n\n--- council/state.md ---\n" + state[-4000:] +
            "\n\n--- council/log.md (recent) ---\n" + log[-6000:]
        )
        response = agent.run(prompt)
        text = response.content if hasattr(response, "content") else str(response)
        lines.append(f"- **{seat}**: {text.strip()}")
        print(f"[{seat}] posted spot-check")
    body = "\n".join(lines)
    header = bb.post(body, "Baraza council cycle")
    print(f"blackboard <- {header}")
    return header


def main():
    bb = Blackboard()
    # Read before acting — blackboard discipline.
    state = bb.read_state()
    seats = [s for s in SEATS if s in state]
    print(f"blackboard read: {len(seats)}/{len(SEATS)} seats on roster")
    if DRY_RUN:
        print("mode: DRY_RUN (scripted deliberation, real blackboard writes)")
        run_dry_cycle(bb)
    else:
        print("mode: LIVE (Agno agents)")
        run_live_cycle(bb)
    print("cycle complete — session ends with a blackboard update, as required.")


if __name__ == "__main__":
    main()
