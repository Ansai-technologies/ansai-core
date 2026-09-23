# Baraza — council log

## 2026-09-23 — Gazette ingestion build landed; governance v1 FINAL
- The-Bell real Gazette ingestion: PR #3 (draft, unmerged, branch
  labs/the-bell-real-ingestion) — ingestor + daily GitHub Actions workflow.
  Parser verified on 3 real KenyaLaw PDFs (no.166: 266 notices; no.165:
  numbering collision merged; no.164: 2 notices); runtime robots.txt check
  passes (allowed); no schema migration needed; idempotent upserts on
  UNIQUE(notice_number, notice_year). Scrape posture: polite, runtime-enforced.
- Round-2 inspect packets complete: EduManage #2 (differentiation brief),
  Voltaic #2 (live-backend wiring), Looply #28 (trust slice), ArdhiX #13
  (hygiene) — all open, zero merges while founder away.
- Governance doc FINAL v1 written (goals workspace
  goals/ecosystem-company-structuring/files/governance.md, supersedes DRAFT).
- Human steps for founder's return: (1) The-Bell Supabase project + schema +
  2 repo secrets + manual backfill run; (2) review 5 open PRs (The-Bell #3,
  EduManage #2, Voltaic #2, Looply #28, ArdhiX #13) with queued decisions.


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

## 2026-09-23 — ArdhiX secret cleanup merged (branch labs/ardhix-secret-cleanup)
- Removed committed .env.local (held Supabase URL, anon key, service-role key, JWT secret); added .env.example with placeholders.
- Cut dead files: lib/blockchain.ts (missing ethers dep + ABI), components/property/BlockchainActions.tsx (missing hook), lib/auth.ts (dead, hardcoded demo creds).
- KEY ROTATION BLOCKED: Supabase project szubjdadhjjsyragoyzn ("Ardhi-x") is PAUSED and cannot be resumed from the dashboard — legacy key list never loads, JWT settings unreachable. Keys unusable while paused; risk returns on resume. Awaiting owner decision: restore via Supabase support, or fresh project + migrate via supabase-setup.sql.

## 2026-09-23 — ArdhiX fresh Supabase project live (gqyzhtbrlvmnizdeqwme)
- New project "ArdhiX" created under Amasai's Org, Free plan, eu-central-1 (Frankfurt). supabase-setup.sql applied cleanly: 5 tables (profiles, properties, property_documents, property_transfers, property_history) + indexes, triggers, RLS policies, GRANTs.
- Owner to copy service_role key from dashboard (masked from agent) into local .env.local; anon key + URL handed over in chat. DB password auto-generated, unrecoverable — reset in Database settings if direct Postgres access ever needed.
- Old paused "Ardhi-x" project untouched; recommend deleting it in dashboard settings to kill the leaked keys permanently.

## 2026-09-23 — ArdhiX Supabase credential live (service_role in vault)
- Secure Vault connector `custom.supabase-ardhix` now holds the new project's legacy service_role key; verified HTTP 200 on all 5 tables (profiles, properties, property_documents, property_transfers, property_history).
- Debugging note: first two stored values returned 401 "Invalid API key". Root cause was placement, not the key: connector was registered bearer_header but Supabase's gateway only reads the `apikey` header. Re-registered with placement custom_header:apikey; skill `~/workspace/skills/supabase-ardhix/` (bin/sb.py) updated to match.
- Remaining owner steps: paste service_role into local .env.local; delete old paused "Ardhi-x" project (kills leaked keys permanently); DB password reset only if direct Postgres access ever needed.

## 2026-09-23 — Live test cycle: 6 real LLM calls on deepseek-flash, all posted to blackboard.

First live cycle: six real model calls on deepseek-flash to prove the loop works end to end, kept deliberately cheap on Melchizedek's instruction. Deliberations ran, blackboard written.

- **Meridian**: Cycle alignment: the ArdhiX Supabase fix is confirmed green — the 401 was connector header placement (custom_header:apikey, not bearer), verified HTTP 200 across all five tables, and Forge's skill update closes that loop. No new packets went to review this cycle, which is correct: everything live this cycle is either already on the board or waiting on approval, not on agents. Assignments: Forge holds the next ArdhiX review packet pending Melchizedek's deletion of the old paused "Ardhi-x" project; Atelier packages the Wincost build into a short review packet (deliverable diff + pending client items) so the next milestone can be approved in one timeblock; Ledger confirms whether the Wincost 30% deposit has been invoiced and paid, and records the leaked-key project as an unpriced risk; Herald keeps the Studios prospecting sequence queued, unsent. What needs Melchizedek's eye: delete the old paused "Ardhi-x" project in Supabase settings (one click, kills the leaked keys permanently), paste the new service_role into local .env.local, green-flag the drafted outbound and Wincost next-touch, and give Wincost's content sign-off or revision notes. Burn is inside plan — all Labs on free tiers, no new spend — and the only live revenue line remains Wincost Africa at KSh 60,000 on 30/30/40. Nothing merges without your approval.

- **Herald**: Herald spot-check: no outbound has moved this cycle — the Studios prospecting sequence is drafted and sitting in queue, and Wincost Africa (KSh 60,000, 30/30/40) is still the only live deal in the pipeline, with the 30% deposit milestone the next gate to confirm with Ledger. Nothing is blocked technically; the bottleneck is purely approval, since every prospect email and the Wincost next-touch need Melchizedek

- **Forge**: Engineering is green: the ArdhiX Supabase connector fix (custom_header:apikey, not bearer) is verified with HTTP 200 across all five tables, and the skill at ~/workspace/skills/supabase-ardhix/ is updated to match — that was a placement bug in our connector config, not a key problem, worth remembering for the next Supabase project. No review packets awaiting approval right now, and nothing blocked on my side; Vercel/Supabase deploy health is nominal, only the old paused "Ardhi-x" project still holds leaked keys. Tech debt that matters: the four remaining owner steps (paste service_role into .env.local, delete the old project, DB password reset only if direct Postgres access is ever needed) are sitting on Melchizedek, not on agents. Next action: once the owner confirms the old project is deleted, I'll open a review packet

- **Atelier**: Studios status: Wincost Africa web build is the live client deliverable, still at the 30/30/40 milestones, and no new packet has gone to review this cycle — my last outputs were the phase deliverables already on the blackboard, so nothing new is queued for merge. Content production is quiet by design this test cycle; I'm not drafting outbound anything without your green flag. Blocked on client input: I still need Wincost's final content/asset sign-off and any revision notes on the current phase before I can move to the next milestone and invoice against it. Next concrete action: package the current Wincost build state into a short review packet (deliverable diff + pending client items) so you can approve the next milestone the moment you're in a timeblock.

- **Ledger**: Status: no new spend logged today — all Labs projects (ArdhiX, Voltaic, Bell, Looply) sit on free tiers, so burn stays inside plan; the only live revenue line is Studios Wincost Africa at KSh 60,000 on 30/30/40, and I'm still missing confirmation on whether the deposit tranche has been invoiced and paid. Blocked on the ArdhiX cleanup: the old paused "Ardhi-x" project with leaked keys is still alive, and while it costs nothing now it's an unpriced risk — one dashboard click in Supabase settings kills it permanently. Compliance watch: we remain a registered business name under the VAT threshold, but if Wincost-style client work stacks up

- **Vanguard**: Labs spot-check: ArdhiX is the only track with fresh movement.

## 2026-09-23 — Infra note: model behavior from the live test cycle

deepseek-flash is a reasoning model with uncontrollable reasoning effort: on identical prompts it used anywhere from ~80 to the entire max_tokens budget on reasoning alone (observed 2000/2000 reasoning tokens, zero text out). Short deterministic seat outputs therefore need a large max_tokens headroom (2000+) or a model with reasoning disabled. The test-cycle runner now filters ds.py's noise lines and retries empty completions. Production daily cycle should budget accordingly or switch member seats to a non-reasoning model.

## 2026-09-23 — Daily Baraza cycle productionized

The council now deliberates every morning on its own. A scheduled job (`baraza-daily-cycle`, ~06:30 EAT) runs all six seats live on `deepseek-flash`, Meridian synthesizes, and the cycle is posted here — the inspect-loop paper trail, no silent work.

Model/token policy committed at `baraza/PRODUCTION.md`: 2500-token headroom per seat (flash can burn the whole budget on reasoning), retry-up-to-3 on empty completions, tight prompts, never fabricate a seat's words.

Makao Makuu picks each cycle up on its 07:21 refresh. Convene-button huddle requests are folded into the next cycle's focus question.

## 2026-09-23 — Governance draft written (verification-by-building edition)

First draft of the ecosystem governance doc is at `workspace/goals/ecosystem-company-structuring/files/governance-DRAFT.md` (119 lines). Written strictly from what today's build verified: the inspect loop as practiced (branch → packet → approval → merge), the Baraza council + daily cycle, emergency bypass and rewrite rules, blackboard write-enforcement, brand/legal boundaries.

Honest core: a 7-item "still unverified" section, headlined by three — (1) merge discipline is convention-only (branch protection needs GitHub Pro/Team), (2) department councils exist only on paper, (3) the emergency bypass has never been invoked. Final version lands after the Gazette ingestion build completes.

## 2026-09-23 — EduManage round-2: differentiation brief

Track: EduManage (Labs rework) | PR: https://github.com/Ansai-technologies/edumanage/pull/2 | Branch: `labs/edumanage-differentiation-brief`

Round 2 executes round 1's approved decision: the competitor research is now a differentiation brief (`docs/differentiation-brief.md`). Headline differentiators: (1) offline-capable ops — the one structural gap no competitor covers; (2) Kenya-native domain model (School DNA + TRANSITION defaults); (3) compliance-by-design (KNEC CBA/SBA, no-ranking in CBC mode). Explicitly do NOT lead with AI/agentic (Citycloud already contests it) or price (Elimikasasa anchors at KES 2,500/mo + free migration — the battleground is switching, not features; brief specifies a migration story incl. M-Pesa history import).

HONESTY FLAG: offline is claimed in the README but zero offline code exists (apps/ are empty stubs) — all claims tagged `[committed]`/`[roadmap]`; no customer copy may claim offline until the Labs build demonstrates sync. Decision requested: (a) approve brief as positioning source, (b) approve with edits, (c) redirect.

PR open for founder review — NO MERGE.

## 2026-09-23 — Voltaic round-2: frontend wiring to live backend

- Track: Voltaic (`Ansai-technologies/Voltaic`) · Branch: `labs/voltaic-frontend-wiring`
- PR: https://github.com/Ansai-technologies/Voltaic/pull/2 — `[inspect-loop] Voltaic: frontend wiring to live backend` (OPEN, awaiting founder review — no merge)
- What: first concrete integration step. New typed backend client `ies-frontend/src/lib/voltaic-api.ts` (URL from `NEXT_PUBLIC_VOLTAIC_API_URL`, bearer from existing `localStorage.authToken`, types mirroring backend shapes, `useSolarSummary()` hook with demo-data fallback); new `ies-frontend/.env.example`; Solar page stats (alerts, battery SOC, health, status banner) now read `GET /api/solar/summary` live, with a "Live · Voltaic API" / "Demo data · backend not connected" footer indicator.
- Diff: 4 files (3 code + review packet at `reviews/2026-09-23-voltaic-frontend-wiring.md`); solar page +10/−6; nothing else restructured.
- Deferred to round 3: rewiring the mock login route to the real backend login (needs token-storage decision); backend summary endpoints still return static stub values — real telemetry is a backend Labs task.
- Decisions requested from founder: approve graceful-fallback pattern; green-light round-3 login rewire + token storage choice; confirm ies-frontend/ as canonical frontend vs root Vite src/ app.

## 2026-09-23 — Looply round-2: Layer 0 trust slice

**PR:** https://github.com/Ansai-technologies/looply/pull/28 — `[inspect-loop] Looply: Layer 0 trust slice — verification tiers, reputation badges, new-seller limit` (branch `labs/looply-trust-slice`, open, awaiting founder review — NOT merged)

**Built:** the recommended next task from the round-1 design packet — Layer 0 trust fields + policy. Schema: `verification_tier` enum (T1 phone / T2 ID / T3 duka-verified), `total_trades`, `disputes_lost`, `last_trade_at` on users. New pure policy module `src/lib/trust.ts`: reputation badge rule ("New seller" 0–4 trades → "N trades · X% smooth" at 5+, disputes lost visible), verification chips, and the new-seller limit (max 3 active listings until 2 completed trades), enforced in `createItem()`. Seller trust badges rendered on the product view. 13 unit tests, all passing (vitest); `tsc --strict` clean.

**Open for founder:** (1) approve slice for merge; (2) migration preference — `drizzle-kit push` at deploy vs a SQL migration file (no migration tooling exists in the repo; columns must land before deploy or `createItem()` breaks); (3) next slice: wire trade completion/dispute outcomes into the counters, roll badges to SellerShopView/ProductList, or Layer 0 listing-integrity pieces.

## 2026-09-23 — ArdhiX round-2: hygiene pass (unblocked work only)

- Track: ArdhiX (`Ansai-technologies/Project-Ardhi-x`) · Branch: `labs/ardhix-hygiene`
- PR: https://github.com/Ansai-technologies/Project-Ardhi-x/pull/13 — `[inspect-loop] ArdhiX: hygiene pass — drop dead code and deps, fix README` (OPEN, awaiting founder review — no merge)
- What: round 1's verification cut the dead blockchain/auth files and fixed the leaked `.env.local`; this finishes the cleanup — deleted `lib/database-config.ts` (legacy SQLite, zero imports), `lib/database.ts` (0 bytes), `test-duplicates.js` (broken root script, run by nothing); `package.json` renamed `my-v0-project` → `ardhix`, dropped dead `prisma` deps; README no longer advertises removed blockchain features. No behavior changes, no Supabase touch, nothing owner-side — the parked owner steps stay parked.
- Packet: `reviews/2026-09-23-ardhix-hygiene.md` (committed + PR body).
- Decision requested: approve as cleanup-only merge when the founder returns.

## 2026-09-23 — The-Bell real Gazette ingestion built (PR open, unmerged)

Labs track: the ingest pipeline that replaces The-Bell's hardcoded data is built and
under review as a draft PR (Ansai-technologies/The-Bell, branch
`labs/the-bell-real-ingestion`, awaiting the founder's return — NOT merged).

What it does: `scripts/ingest_gazette.py` politely scrapes KenyaLaw's public gazette
PDFs (robots.txt verified allowed at runtime; 2s between requests; clear UA), splits
issues on standalone `GAZETTE NOTICE NO. NNNN` headings, and upserts into Supabase
`notices` on the existing UNIQUE(notice_number, notice_year). Parser verified against
3 real issues: no.166 (132 pp -> 266 notices, sequential), no.165 (97 pp -> 343 rows,
one Government Printer numbering collision merged, not dropped), no.164 special
(2 pp -> 2 notices). Daily GitHub Actions run at 07:00 EAT + manual backfill dispatch.

The one human step: create the Supabase project, run reviews/the-bell-schema.sql,
add SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY repo secrets — then the workflow runs
the 2026 backfill on next schedule. No schema migration was needed; /api/notices?q=
reads the same table unchanged.

## 2026-09-23 ~17:20 EAT — Zoho Mail wired (Ansai)
- custom.zoho OAuth connected (scopes: accounts/folders/messages READ + messages CREATE); skill at ~/workspace/skills/zoho/ with bin/zmail.py.
- Verified read on hello@ansaitechnologies.co.ke (list, search, full content all green). Send endpoint wired but UNTESTED and gated: no sends without founder greenlight per send (his rule, recorded in memory).
- Mail API host note: mail.zoho.com/api is the working base for this account (www.zohoapis.com 404s); accepts Bearer; content endpoint needs folderId in path.

## 2026-09-23 ~17:30 EAT — Founder confirmation loop live (Ansai)
- Built per founder's instruction: a system that keeps questioning pending items instead of assuming state.
- Ledger: workspace/goals/ecosystem-company-structuring/hidden_files/awaiting-founder.md (8 items seeded: 5 PR reviews, The-Bell Supabase step, WhatsApp, TikTok, Instagram, ArdhiX cleanup, PAT rotation [parked], PSC outcome [watching]).
- Cron: founder-confirmation-check, daily ~08:21 EAT, owner goal:ecosystem-company-structuring. Verifies what it can via API, re-asks pending items stale >2d (parked >14d), caps at 5 questions, stays silent when nothing qualifies. Worker asks; main agent folds replies into the ledger.
- PSC DLP Cohort 5: founder confirms he already applied — moved to watching/outcome.

## 2026-09-23 ~16:55 EAT — Studios funding engine drafted (Ansai)
- Subagent completed: prospecting-campaign.md (Tangaza's draft: ICP = Nairobi-metro owner-operated SMEs, 20-lead wave 1, 3-touch WhatsApp-first sequence with full draft messages) + wincost-scope.md (7 pages, Vercel+Next.js+Supabase, 2-3 weeks, hosting ~KSh 2-3.3k/yr inside the 10k cap, 10 open questions for Ian Limo incl. what Wincost actually does — not guessed).
- Nothing sent, no one contacted, nothing spent. Send-gate baked into the campaign doc (founder approves each batch).
- Founder decisions needed: approve ICP + sequence, seed/approve 20-lead list, sender identity (dedicated Studios line recommended), portfolio proof from Msanii, per-batch send greenlight.
- Caveat flagged: rate card still says "Ubunifu Studios" vs 21 Sep rename to Ansai Studios — needs rebranding before it goes out.

## 2026-09-23 ~17:00 EAT — Inspect-loop PR pre-review complete (Ansai)
- Read-only pre-review of all 4 open inspect-loop PRs, synthesized into ~/workspace/reviews/REVIEW-NOTES.md. Verdicts: 3 CHANGES, 1 MERGE.
- EduManage #2 CHANGES: brief violates its own offline-gating rule (sales paragraph claims shipped capability); section 3 untagged despite honesty note; "constitution" offline quote is actually from README; README offline claim untouched.
- Voltaic #2 MERGE (with eyes open): small, clean, reversible, honest packet. "Live" indicator serves stub data; follow-ups: log caught errors, fix 401-label, decide token storage + canonical frontend.
- Looply #28 CHANGES — functionally broken as shipped: nothing increments total_trades so the 3-listing cap is unresolvable and existing sellers get retroactively capped; no migration tooling; error path returns generic 500; disputes hidden under 5 trades; T1 default tier unverified.
- ArdhiX #13 CHANGES: README half-cleaned (Features list still claims blockchain), 2 stale lockfiles, and Supabase key rotation still pending — keys sit in PUBLIC git history (commit 0db21836), rotation is the founder's highest-priority item on this repo.
- Pattern: every packet disclosed its own risks honestly, but branches shipped anyway. Proposed rule for founder: packet-flagged risk -> resolved or explicitly deferred with an owner becomes a hard merge rule.
- Voltaic #2 named as the template for future inspect-loop rounds.
