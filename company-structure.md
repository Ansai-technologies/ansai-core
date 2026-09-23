# Company Structure: Ansai Technologies and Ubunifu

Version 1, for Melchizedek's review and correction. Written 2026-09-23 from the completed grilling sessions. Nothing here is final until he says so.

## 1. Entities and legal

Ansai Technologies is a registered business name, not a Ltd. It sits below the KRA VAT threshold, so no VAT is charged. Ubunifu has no legal existence: it is a brand and division under the Ansai business name. The Engineer's Journal is fully separate from the company and does not appear in this structure.

Two tripwires change this, and only these:
- Ansai becomes a Ltd when revenue nears the KRA VAT threshold, or when a hire or major contract requires it.
- Ubunifu gets its own legal existence when it takes money or signs partnerships in its own name.

Until a tripwire fires, both brands operate under the single registered business name.

## 2. The thesis

We are not entering sectors one by one. We are building a self-sustaining community ecosystem, funded by itself, from three pillars that converge into it:

- SPACE (land): land space (housing, industry), water space (agriculture, water), air space (defense and security).
- COMMUNITY: social interactions and wellbeing, leadership and governance, economics, education and knowledge, defense and security.
- ENERGY, converted into INFRA: tech and energy, food production and processing, water infrastructure, healthcare.

Every product and every bet must answer which pillar it builds. If it builds none, it does not get built.

## 3. Pipeline and repo map

Grouped by pillar. Brand rule: community and space products ship under Ansai; Ubunifu is reserved for substrate infrastructure bets.

SPACE
- ArdhiX: blockchain-powered land registry. Repo: IamAmasai/Project-Ardhi-x (MVP, pushed Jan 2026). Older prototype: IamAmasai/ARDHIX.

COMMUNITY
- EduManage: operational infrastructure for Kenyan schools, CBC/844 compliant, multi-tenant, offline-capable. The flagship and trust anchor. Repo: Ansai-technologies/edumanage. Status: largely live; rework runs as a Labs track.
- Gazette Watch: governance monitoring. Repo: IamAmasai/The-Bell (early).
- UshurPay: economics. Idea stage, no repo yet.
- Looply (The Closet): circular economy resale. Repo: IamAmasai/The-Closet- (early).

ENERGY to INFRA (Ubunifu bets)
- Bet 1, Intelligent Energy Systems: code and ideas live on the repo; partner with clean-energy providers first, build our own solar over time.
- Bet 2, Ubunifu Clouds: cloud infrastructure. An investor plan already exists in the files.
- Bet 3, Local AI infrastructure: unnamed, undated. The local AI wave (open models on local hardware, hybrid local-first plus cloud escalation) is a real opportunity map for this bet and for Labs ideas.

GOVERNANCE PLATFORM
- ansai-core: the heart everything pumps from. Governing docs, shared primitives, the Tier-1 agent constitution. Repo: Ansai-technologies/ansai-core.

FLAG (resolved 2026-09-23): Voltaic is the base. Intelligent-Energy-Systems' Next.js
frontend was merged into Voltaic under `ies-frontend/` (commit b549939) and the
IES repo archived. ARDHIX (old prototype) also archived.

## 4. Departments, Labs, and staffing

Four departments:
- Product and Engineering: builds and maintains the products.
- Studios: client services plus all creative and content work (content is folded in here, not separate).
- Marketing and Sales: outreach, pipeline, deals. Agents do the outreach work; Melchizedek approves anything that goes out under his name.
- Finance and Ops: money, records, compliance, operations.

Labs is the incubator, not a department. Ideas live there as repos; agents build iteratively; Melchizedek inspects and either graduates them or kills them.

Staffing model is MIX: Melchizedek works in weekly timeblocks and drops in to inspect and lead reviews; the agents keep working continuously; when he is away, Kiongozi (council chair) assigns work and the council keeps building until he returns.

His time split: Product and Engineering 35%, Studios 35%, Marketing and Sales 15%, Labs 10%, Finance and Ops 5%.

## 5. Money and sequence

Studios client work is the funding engine. The Wincost deal is the template: KSh 60,000 all-in, hosting capped at KSh 10,000 per year, 30/30/40 payment split, Ansai not VAT-registered. Personal savings are a bridge only. Outside capital waits until a pillar genuinely demands it.

There is no strict build order. Four tracks run simultaneously with agents in parallel: EduManage (first among equals, since it is live and is the trust anchor), the ArdhiX MVP, Voltaic, and Studios client work. Cheap pillars fund the expensive ones.

## 6. The agent council (Baraza)

The council is called the **Baraza** (Swahili: council). Its members have Swahili
role-names, on-brand with Ansai and Ubunifu; Melchizedek can rename any of them.

- **Kiongozi** (chair of the general council): leader/guide. Assigns work, keeps the council moving when Melchizedek is away.
- **Tangaza** (Marketing and Sales lead): from *kutangaza*, to announce/market.
- **Mhandisi Mkuu** (Senior Engineer, Product and Engineering lead): chief engineer.
- **Msanii** (Studios lead): artist/creative — covers client services plus all content work.
- **Hazina** (Finance and Ops lead): treasury.
- **Mpelelezi** (Labs scout): scout/investigator — finds and probes new ideas.

Each departmental council is its lead plus member agents from other departments, so engineering discussions include marketing, finance, and labs voices. They discuss, build, and report up to the general council. Melchizedek joins to lead review and can drop into any departmental discussion.

Sync is a shared council log, the blackboard pattern: chairs post agreements and milestones, every agent reads it before acting. Day one it lives as a council/ directory in the repo (log.md plus state.md), with commits as the audit trail. It doubles as the paper trail for the inspect loop.

Stack: Agno for orchestration (its Teams map to this council almost one to one), DeepSeek as the workhorse model, Gemini as fallback and for multimodal tasks. Chair and leads run on stronger models, workers on cheap ones. LangGraph is the escape hatch if Agno ever constrains a custom workflow.

## 7. Governance outline

Governance is verified by building, not rewritten on paper. The constitution (AGENTS.md Tier-1 in ansai-core) plus per-repo AGENTS.md and CONTEXT.md files were an untested ideal; the buildout is the test.

- Dira is the principles collection. The principles were scattered through his writing and building; they get gathered into Dira as the work proceeds.
- The Labs inspect loop is the enforcement mechanism: agents build on branches, produce a markdown review packet, Melchizedek approves, then commit, push, and deploy. Branch protection makes this structural, not voluntary.
- Every important company detail is written down clearly before building begins. This document is the first of those.

## 8. Open questions — resolved, plus Phase 0 status

Resolved 2026-09-23 (Melchizedek delegated all of them):
- Council home: **ansai-core**, brand-neutral, where governance already lives → `council/` with `log.md` + `state.md`.
- Review-packet format: one markdown file per review at `reviews/YYYY-MM-DD-<track>.md` — what was built, files changed, how to verify, risks, decision requested. Goes in the PR body and gets committed.
- Energy consolidation: Voltaic is the base (done, see section 3).
- First outreach under Tangaza: a Studios prospecting campaign, drafted by Tangaza once the inspect loop is validated; Melchizedek approves before anything sends.

Phase 0 GitHub cleanup (2026-09-23): DONE — energy consolidation + both archives,
descriptions on all four pipeline repos, The-Bell README, AGENTS.md/CONTEXT.md
governance files on all four pipeline repos (The-Closet-'s original AGENTS.md was
restored and kept, with the ecosystem header added on top).
PENDING on Melchizedek: (1) transfer Voltaic, Project-Ardhi-x, The-Bell and
The-Closet- from IamAmasai to the Ansai-technologies org (the API token lacks the
transfer scope, so this is four manual moves in repo Settings); (2) widen the
GitHub token's repository access to cover the Ansai-technologies org (it can read
org repos but cannot write to them — this blocks the council/ scaffolding in
ansai-core and all future agent work on org repos). After both, the council/
scaffolding lands in ansai-core and the platform design begins.
