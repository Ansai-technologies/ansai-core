# Internal Platform Design — Ansai Ecosystem

Status: design v1, 2026-09-23. Decisions below come out of the grill-me session; the
whole document is verification-target #1 for the AGENTS.md/CONTEXT.md governance.

## 1. Vision

GitHub is the single access point and operating substrate for the ecosystem. Not a
code mirror of work that happens elsewhere — the place where the work happens, is
recorded, reviewed, and decided.

- **Repos = tracks/departments.** EduManage (flagship), ArdhiX (Project-Ardhi-x),
  Voltaic (intelligent energy), The-Bell (Gazette Watch), The-Closet- (Looply),
  Studios client work. Each pipeline repo is a self-describing unit: code,
  governance files, review history, deployment config.
- **ansai-core = the heart.** Tier-1 AGENTS.md (agent constitution), @ansai/
  primitives, the Baraza blackboard (council/log.md, council/state.md), and
  company-wide docs. Everything else inherits from it.
- The user never asks "where is the thing?" — every thing has a repo, every repo
  has CONTEXT.md, every CONTEXT.md points at ansai-core.

## 2. Architecture: Baraza on Agno

Agno Teams map 1:1 to the council roster. A Team = one council; agents = members.

**General council (Baraza)** — Team "baraza":
Kiongozi (chair), Tangaza, Mhandisi Mkuu, Msanii, Hazina, Mpelelezi. Kiongozi is
the router: when Melchizedek is absent, Kiongozi assigns work to leads and resolves
deadlocks by logging a decision (not by decree — decisions are reviewable).

**Department councils** — one Team per department/track (P&E, Studios, M&S,
Finance & Ops, and each Labs track). Pattern: department lead (or scout for Labs)
+ cross-department member agents as needed. Department chairs discuss, build, and
report UP to the general council via the blackboard; the user can drop into any
department discussion.

**Model allocation:** chair and department leads run on stronger models
(Gemini-class or better); worker agents run on DeepSeek as the cheap workhorse,
Gemini as fallback and for multimodal tasks. This is a cost position, not a
religion — revisit when bills arrive.

**Blackboard protocol (council/ in ansai-core):**
- `council/log.md` — append-only. Chairs post: agreements reached, milestones hit,
  decisions with a date and owner. Newest at the bottom.
- `council/state.md` — current snapshot: who owns what track, what's blocked, next
  milestone per track. Overwritten in place, committed.
- **Read-before-acting rule:** an agent must read council/state.md and the last N
  log entries (N = 20) before starting a task. Stale agents get it wrong; this is
  how they stay in sync without realtime messaging.
- **Commit-as-audit-trail:** every log/state change is a git commit by the agent
  (signed with its name). The history is the governance record — no separate
  meeting notes, no chat summaries.
- **Write-as-much-as-you-read rule:** writing is as mandatory as reading. Every
  work session ends with a blackboard update — what was decided, what moved,
  what's blocked, what was learned. Status changes, blockers, and decisions are
  posted the same day they happen, not batched for later. An agent that worked
  all day and wrote nothing to the blackboard did not do its job. No silent
  work: if it isn't on the blackboard, the council doesn't know it.

**Where state lives:** all shared agent state lives in council/state.md and
council/log.md, plus per-repo reviews/ (see section 3). Agent-local scratch
(working notes, drafts) lives in the agent's own workspace, never assumed shared.
Code lives in repos. If it isn't committed, it didn't happen.

## 3. The inspect loop (execution primitive)

Every unit of agent-built work, no exceptions:

1. **Branch** off main in the relevant repo (`labs/<track>-<slug>` or
   `feat/<slug>`). No direct pushes to main.
2. **Build** on the branch. Agent commits as it goes (small, described commits).
3. **Review packet** written at `reviews/YYYY-MM-DD-<track>-<slug>.md` on the same
   branch. Schema:
   - `## What was built` — plain-language summary, 3-8 bullets.
   - `## Files changed` — list with one-line purpose each.
   - `## How to verify` — exact steps the user runs (commands, URLs, screenshots)
     to confirm it works. If a step needs the user's credentials/browser, say so.
   - `## Risks / open edges` — what could be wrong, what's deliberately deferred.
   - `## Decision requested` — merge, merge-with-changes, or abandon; plus any
     product decision the user must make.
4. **Human approval.** PR opened with the packet as the body. The user reviews —
   his weekly timeblock is built around this queue. Approving = comment "approved"
   (or request changes).
5. **Merge → deploy.** Only after approval. Deployment config lives per repo so
   merge-to-deploy is mechanical.

Review packets are committed to the repo: `reviews/` is the permanent inspect
history. Old packets are never deleted.

## 4. Repo conventions

Inheritance chain, enforced by reading not tooling (verification-by-building):

```
ansai-core/AGENTS.md (Tier-1 constitution)
  └─ <repo>/AGENTS.md — "inherits ansai-core Tier-1; repo-specific rules below"
       └─ <repo>/CONTEXT.md — what this repo is, current state, roadmap, links
```

Rules:
- Every pipeline repo has AGENTS.md, CONTEXT.md, README.md, and reviews/.
- AGENTS.md opens with the ecosystem header + inheritance line; repo-specific
  content below. Never overwrite a substantive AGENTS.md blindly — read it first.
- CONTEXT.md is kept current (stale CONTEXT.md is a bug; the building agent
  updates it as part of each review packet).
- `reviews/YYYY-MM-DD-<track>-<slug>.md` — exact naming, zero-padded date.
- `council/` exists only in ansai-core. Branches: `labs/<track>-<slug>`,
  `feat/<slug>`, `fix/<slug>`.
- Secrets: never committed. A committed `.env.local` (seen once in
  Project-Ardhi-x) is treated as a security incident: rotate keys, purge history,
  note in the review packet.

## 5. Access & identity

- **One org:** Ansai-technologies. All pipeline repos live here. Personal-account
  repos are staging, not home.
- **Machine access:** PAT-based, stored in the secure vault, wired to the
  workspace GitHub skill. The token needs `repo` + `admin:org` scope — without
  write on org repos and admin for transfers/protection rules, agents are
  read-only observers. Scope reviews are quarterly.
- **Branch protection:** main requires a pull request with an approved review
  packet. Humans (Melchizedek) can bypass in an emergency; every bypass is
  logged in council/log.md with a reason.
- **Who can do what:**
  - Agents: branch, build, commit, open PRs, write review packets, update
    council/log.md + state.md, deploy per repo config.
  - Agents cannot: merge their own PRs, spend money, send external comms
    (Tangaza drafts; the user approves every send), rotate credentials.
  - Melchizedek: approve/reject packets, merge, set direction in state.md,
    emergency bypass. He is the only merge button.

## 6. Build order

**Phase A — Inspect loop live on one Labs track (The-Bell).**
Simplest track: a working notices app, small surface, no live users. Work: branch
protection on main, reviews/ seeded, one real change run through the full loop.
Done = one review packet approved by the user and merged, deploy verified.
He verifies by running the packet's "How to verify" steps himself.

**Phase B — Blackboard protocol hardened.**
council/log.md + state.md under real load: two tracks building concurrently,
read-before-acting enforced, a conflict resolved through the log. Done = two
weeks of clean log with no stale-state incident, and one entry the user made
himself. He verifies by reading the log end to end — it should narrate the
fortnight.

**Phase C — Department councils.**
Spin up P&E and Studios councils (real client work needs Studios first);
M&S, F&O, Labs scout follow. Done = each council has a chair agent, a log
presence, and one completed review cycle. He verifies by attending one
departmental review and by checking that Kiongozi routed a task in his absence
without asking him.

**Phase D — Rollout to all tracks.**
EduManage, ArdhiX, Voltaic, Looply onto the loop; governance doc written from
what was verified (this is the "governance clearly outlined" deliverable — it is
written AFTER the build proves it, not before). Done = every pipeline repo shows
the full convention set and the governance doc reads as a description of working
practice, not an aspiration.

## 7. Decisions (answered 2026-09-23)

1. **Deployment targets — DECIDED 2026-09-23: all-serverless.** Vercel for
   frontends + Supabase hosted for Postgres across tracks. Zero ops overhead
   while the team is just Melchizedek + agents; costs scale per project and data
   lives outside Kenya for now — revisit when bills arrive or when school /
   financial data residency forces the question (the Hetzner hybrid remains the
   fallback). Phase A deploys The-Bell to Vercel + Supabase.
2. **Emergency bypass:** only for genuinely critical situations — production
   down, data loss, active security incident. The human or Kiongozi declares
   the emergency; it must be logged to the blackboard retroactively with
   justification within 24h. A bypass defers the review packet, never skips it.
3. **Review cadence:** daily async spot checks per department — each
   departmental chair posts a short status to the blackboard every day. The
   weekly timeblock remains the full approval review; a midweek deeper check
   is optional.
4. **Rewrites:** major rewrites need the human's explicit green flag BEFORE
   starting. Without it, rewrite work may only happen as a comparison spike on
   a branch — and must present: why the rewrite, pros, cons, and a side-by-side
   against the current code. Nothing merges without the green flag.
