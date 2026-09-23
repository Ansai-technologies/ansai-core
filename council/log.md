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
