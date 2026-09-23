# Baraza production policy

How the daily deliberation cycle runs in production. Set 2026-09-23 after the live test cycle.

## Models
- Workhorse: `deepseek-flash` via the vaulted CLI (`~/workspace/skills/deepseek/bin/ds.py chat`).
- Fallback: `deepseek-v4-pro` if flash is degraded. Gemini only when multimodal input is needed.

## The reasoning-budget problem
`deepseek-flash` is a reasoning model with UNCONTROLLABLE reasoning effort. Observed 2026-09-23: on near-identical prompts it spent anywhere from ~80 to the entire `max_tokens` budget on reasoning alone (2000/2000 reasoning tokens, zero text returned). Short deterministic seat outputs therefore need large headroom.

## Token policy
- Every seat call: `--max-tokens 2500` minimum. Never below 2000.
- Keep prompts tight: seat brief (from `baraza/agents.py`) + ONE focused question. Long context invites long reasoning.
- Retry on empty/truncated: up to 3 attempts per seat. If a seat still fails, record "no response" — never fabricate its words.
- Chair synthesis (Meridian): same model, `--max-tokens 2500`.

## CLI quirks
- `ds.py` prints `HTTP 200` on stdout and usage JSON on stderr. Filter both when parsing responses. Same pattern in `gm.py`.

## The daily cycle
- Runs every morning (~06:30 EAT) via the scheduled `baraza-daily-cycle` job.
- One entry per run appended to `council/log.md`: date header, per-seat sections, Meridian's summary.
- Convene-button huddle requests from Makao Makuu are folded into the day's focus question.
- If the whole run fails, post a brief failure note to the log — never stay silent.
- No chat report; the blackboard entry is the record.
