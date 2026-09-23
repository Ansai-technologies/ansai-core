# Baraza — agent council prototype

The Baraza is the general council of Ansai Technologies: six AI agent seats that
do continuous work while Melchizedek inspects on his weekly timeblock. This
prototype proves the council loop end to end: agents read the shared blackboard,
deliberate, and write back.

## Seats

| Seat | Name | Domain |
|---|---|---|
| Chair | Meridian | General council — alignment, assignments, emergency bypass |
| A | Herald | Marketing & Sales — pipeline, prospecting drafts (approval-gated) |
| B | Forge | Product & Engineering — review packets, deploy health |
| C | Atelier | Studios — client work (funding engine) + creative/content |
| D | Ledger | Finance & Ops — spend, invoices, KRA/VAT tripwires |
| E | Vanguard | Labs scout — pipeline research, competitor scans |

## Files

- `agents.py` — the six Agno agents with role instructions true to their seats.
  Model policy from env: `DEEPSEEK_API_KEY` workhorse (`DEEPSEEK_MODEL`,
  default `deepseek-chat`), `GEMINI_API_KEY` fallback/multimodal
  (`GEMINI_MODEL`, default `gemini-2.5-flash`), chair on a stronger model via
  `CHAIR_MODEL` (default `deepseek-reasoner`; a `gemini`-prefixed id selects
  the Gemini provider).
- `blackboard.py` — blackboard tools: `read_log()` / `read_state()` read
  `council/log.md` + `council/state.md`; `post()` appends a timestamped section
  to `council/log.md` via the GitHub API. Append-only — history is never
  rewritten. Auth uses the runtime's `custom.github` credential, falling back
  to `GITHUB_TOKEN` elsewhere; repo override via `BARAZA_REPO`.
- `council.py` — the runner. One cycle: read blackboard -> each seat posts its
  daily async spot-check -> chair posts summary -> session ends with the
  blackboard update (write-enforcement rule).
- `requirements.txt` — `agno`, `openai`, `google-genai`.

## Run a cycle

```bash
pip install -r requirements.txt
cd baraza

# Prove the loop today: scripted deliberation, REAL blackboard writes, zero LLM calls
DRY_RUN=1 python council.py

# Live mode: each seat deliberates through its Agno agent (needs API keys)
DRY_RUN=0 python council.py
```

## How review packets get produced

The council does not merge code itself — that is the inspect loop's job. When
an agent finishes build work on a track branch, Forge (Product & Engineering)
drafts the review packet at `reviews/YYYY-MM-DD-<track>.md` (what built, files
changed, how to verify, risks, decision requested), posts a blackboard entry
linking it, and Melchizedek approves or rejects. Merge and deploy happen only
after approval. The blackboard (`council/log.md`) is the audit trail: every
packet, approval, and merge is logged there.

## Dry-run proof (2026-09-23)

Ran with `DRY_RUN=1` — scripted deliberation, real blackboard writes, zero LLM
calls. The full six-seat cycle posted to `council/log.md` as
"2026-09-23 — Baraza dry-run cycle (prototype proof)":

```
blackboard read: 6/6 seats on roster
mode: DRY_RUN (scripted deliberation, real blackboard writes)
[Meridian] posted spot-check
[Herald] posted spot-check
[Forge] posted spot-check
[Atelier] posted spot-check
[Ledger] posted spot-check
[Vanguard] posted spot-check
blackboard <- ## 2026-09-23 — Baraza dry-run cycle (prototype proof)
cycle complete — session ends with a blackboard update, as required.
```

## To go live

Exactly two env keys are needed:

- `DEEPSEEK_API_KEY` — workhorse model for the five member seats.
- `GEMINI_API_KEY` — fallback / multimodal model.

Optional: `CHAIR_MODEL` (stronger model for Meridian), `DEEPSEEK_MODEL` /
`GEMINI_MODEL` (model ids), `GITHUB_TOKEN` (only needed outside this runtime;
inside, the `custom.github` connector is used), `BARAZA_REPO` (defaults to
`Ansai-technologies/ansai-core`).

One decision remains: **where the agent runtime lives long-term**. The
prototype runs on demand (`python council.py`, e.g. from a scheduled job or a
timeblock session). When the council needs to run continuously — agents working
between timeblocks, reacting to events — it needs a home: a small always-on
host (VPS), a scheduled runner, or the future internal platform runtime. That
call is Melchizedek's; nothing in this prototype assumes an answer.
