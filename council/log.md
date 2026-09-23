# Baraza — council log

The shared blackboard. Chairs post agreements, milestones and decisions here;
every agent reads it before acting. Commits are the audit trail.

## 2026-09-23 — Council constituted
- General council (Baraza) formed: Kiongozi (chair), Tangaza (Marketing & Sales),
  Mhandisi Mkuu (Product & Engineering), Msanii (Studios), Hazina (Finance & Ops),
  Mpelelezi (Labs scout).
- Phase 0 GitHub cleanup executed: Voltaic, Project-Ardhi-x, The-Bell and
  The-Closet- transferred to the Ansai-technologies org; Intelligent-Energy-Systems
  consolidated into Voltaic (ies-frontend/) and archived; ARDHIX archived.
- Inspect loop agreed as first platform slice: build → review packet
  (reviews/YYYY-MM-DD-<track>.md) → human approval → merge → deploy.

## 2026-09-23 — Phase A: inspect loop live on The-Bell
- Branch protection BLOCKED: GitHub refuses branch protection on private repos
  without Pro/Team ("Upgrade to GitHub Pro or make this repository public").
  The-Bell is private. Decision needed from Melchizedek: upgrade org to Team,
  make The-Bell public, or accept convention-based enforcement. Until then the
  "no direct push" rule is enforced by AGENTS.md convention only.
- `reviews/` seeded with TEMPLATE.md (packet schema per platform design §3).
- First loop change on branch `labs/the-bell-notice-search`: `GET
  /api/notices?q=` numeric queries now match `notice_number`/`notice_year`
  exactly. PR #1 opened with review packet at
  `reviews/2026-09-23-the-bell-notice-search.md` — AWAITING Melchizedek's
  approval. NOT merged: the loop requires his green flag.
- Deploy step pending: no Vercel/Supabase accounts connected yet.

## 2026-09-23 — The-Bell serverless adaptation (PR #2, awaiting approval)
- Branch `labs/the-bell-vercel`: Express backend ported to Vercel serverless
  functions (`api/health.ts`, `api/notices.ts`, `api/notices/[id].ts`,
  `api/_db.ts`); `vercel.json` added (vite build -> dist, SPA rewrites);
  `.env.example` documents DATABASE_URL; `reviews/the-bell-schema.sql` ready
  for Supabase SQL editor. API behavior identical incl. PR #1 numeric search.
- Review packet: `reviews/2026-09-23-the-bell-vercel.md` on the branch; PR body
  carries the full packet. NOT merged — his approval required (inspect loop).
- server.ts kept for local dev (`npm run dev` unchanged).
- Not verified at runtime here: no Postgres / Vercel account in this
  environment. Real proof = `vercel dev` against Supabase (steps in packet).
- Still needs human: Supabase project + run schema SQL; Vercel import + env
  vars (DATABASE_URL, GEMINI_API_KEY); approve + merge PR #2.

## 2026-09-23 — Council renamed (user request: nice-sounding, meaningful, not necessarily Swahili)
- Meridian (chair) — the reference line everything aligns to; alignment and final say.
- Herald (Marketing & Sales) — carries the message outward; prospecting and voice.
- Forge (Product & Engineering) — where raw ideas are hammered into working systems.
- Atelier (Studios) — the creative workshop; client work and content.
- Ledger (Finance & Ops) — the book of record; money and operations.
- Vanguard (Labs scout) — the advance party; finds and tests new bets.
- User scope decision: no deploys required today. Deliverable = company structure standing + pipelines working. The-Bell real-data work deferred.

- 2026-09-23 ~14:30 EAT — EduManage Labs track seeded: competitor research packet ready for human review (Ansai-technologies/edumanage PR #1, branch labs/edumanage-competitor-research; reviews/2026-09-23-edumanage-competitors.md + reviews/TEMPLATE.md).
- The-Closet- (Looply) trust-mechanism design packet ready for review: PR #27 (branch `labs/closet-trust-design`, reviews/2026-09-23-closet-trust-design.md). Design-only, not merged. Key items: two-layer trust model (verification tiers T1–T3 + reputation rate now; licensed-PSP escrow + dispute adjudication when payments go live), doc-direction fork flagged (status.md Prototype 1 vs LOOPLY_SPEC escrow-first), decision requested.

## 2026-09-23 — Baraza dry-run cycle (prototype proof)
_DRY RUN — scripted deliberation, zero LLM calls. 2026-09-23 14:32 EAT._

- **Meridian**: **Chair summary** — Cycle complete. Inspect loop is proven on The-Bell (branch -> review packet -> approval -> merge -> deploy). Assignments: Herald drafts prospecting outreach for approval; Forge hardens The-Bell (branch protection, notices verification); Vanguard starts EduManage competitor research; Ledger watches spend. Nothing here needed an emergency bypass. Next full review: Melchizedek's weekly timeblock.
- **Herald**: **Marketing & Sales spot-check** — Studios prospecting campaign draft is ready to run (inspect loop now validated by the The-Bell deploy). Wincost Africa deal steady at KSh 60,000, 30/30/40. Next: send Melchizedek the outreach drafts for approval before anything goes out.
- **Forge**: **Product & Engineering spot-check** — The-Bell is live on Vercel + Supabase (PRs #1 and #2 merged; /api/health returns ok). Open: branch protection is now possible since The-Bell went public; the notices endpoint against the live database is the one unverified step. Next: configure branch protection, verify /api/notices, then roll the loop to the next track.
- **Atelier**: **Studios spot-check** — Wincost Africa web build is the active client deliverable. No blockers reported. Next: confirm build milestones against the 30/30/40 payment schedule and post the content calendar for review.
- **Ledger**: **Finance & Ops spot-check** — Spend is within the all-serverless Q1 posture (Vercel Hobby + Supabase free tier). Watch item: model API and hosting bills as tracks go live; revisit hosting when bills arrive. KRA: still below the VAT threshold, no action. Next: set a monthly spend-review reminder.
- **Vanguard**: **Labs spot-check** — EduManage competitor differentiation is the first agent research task. The-Bell real Gazette ingestion is queued behind the deploy. Voltaic consolidation (IES frontend) is landed. Next: start the EduManage competitor scan and scope the Gazette ingestion source.

- 2026-09-23 ~14:35 EAT — Voltaic inspect-loop seeded: consolidation-check packet ready (PR Ansai-technologies/Voltaic#1). Finding: ies-frontend/ is a complete Next.js app but fully unwired/mocked; two frontends now exist — canonical-frontend decision (A/B/C) requested from Melchizedek.

- 2026-09-23 ~15:30 EAT — ArdhiX verification packet ready: PR Ansai-technologies/Project-Ardhi-x#12 (branch labs/ardhix-verification). Findings: Supabase schema/auth/middleware solid; blockchain layer entirely unwired (dead stubs, ethers dep missing, no ABI/address); .env.local committed with live-looking Supabase keys incl. service-role key — ROTATION REQUIRED before pilot; docs overclaim (console.log present, .env.example missing, TS errors hidden by config). Awaiting human decision: rotate keys + wire-or-cut blockchain.

## 2026-09-23 — Inspect-loop decisions (user delegated to assistant, chat 14:46 EAT)

All four track packets reviewed and MERGED by assistant under delegated authority:
- **EduManage PR #1** (competitor research): brief APPROVED (offline-capable ops, Kenya-native domain model, compliance-by-design). Hands-on feature-parity audit (trial accounts) commissioned BEFORE any rework code — offline claim unverified.
- **ArdhiX PR #12** (verification): blockchain dead files to be CUT (never compiled, missing deps); DB-first; on-chain anchoring → later Labs track. Key rotation + .env.local removal user-approved and in progress.
- **Voltaic PR #1** (consolidation): Option A — Vite frontend canonical (wired to Express backend); ies-frontend/ read-only reference. No rewrite, no green flag needed.
- **The-Closet- PR #27** (trust design): two-layer design APPROVED; canonical direction = escrow-first spec (LOOPLY_SPEC.md). Layer 0 pilots first; Layer 1 escrow when PSP contract in place. Layer 0 schema work green-lit as next build task.
