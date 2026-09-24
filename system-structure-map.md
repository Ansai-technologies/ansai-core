# Ansai Technologies — System Structure Map

*As-is vs to-be. Drawn 2026-09-24 as a discussion document for Melchizedek. Nothing here is final until he says so. Companion to `company-structure.md` (v1, 2026-09-23) and the Dira entries (`dira/`).*

---

## AS-IS — the company as it stands today

### Legal & identity

- **Ansai Technologies**: registered business name, not a Ltd. Below the KRA VAT threshold — no VAT charged.
- **Ubunifu**: a brand and division under Ansai, no legal existence. Reserved for substrate infrastructure bets.
- **The Engineer's Journal**: fully separate from the company. Does not appear in this structure.
- Tripwires (only these change the above): Ansai becomes a Ltd when revenue nears the VAT threshold, or a hire/major contract requires it. Ubunifu gets legal existence when it takes money or signs partnerships in its own name.

### The thesis (unchanged)

A self-sustaining community ecosystem, funded by itself, built from three pillars. Every product must answer which pillar it builds — if none, it does not get built.

- **SPACE** (land, water, air): housing/industry, agriculture/water, defense/security.
- **COMMUNITY**: economics, education/knowledge, governance/leadership, social wellbeing.
- **ENERGY → INFRA**: tech + energy, food production/processing, water infrastructure, healthcare.

### Products by pillar (+ status today)

| Pillar | Product | What it is | Status | Repo |
|---|---|---|---|---|
| SPACE | ArdhiX | Blockchain land registry | MVP (Jan 2026) | IamAmasai/Project-Ardhi-x |
| COMMUNITY | EduManage | School operations infra, CBC/844, multi-tenant, offline-capable — the flagship and trust anchor | Largely live; rework runs as Labs | Ansai-technologies/edumanage |
| COMMUNITY | Gazette Watch (The-Bell) | Governance monitoring | Early; live deploy is test scaffolding, real Gazette ingestion is a later Labs task | IamAmasai/The-Bell |
| COMMUNITY | UshurPay | Economics | Idea stage, no repo | — |
| COMMUNITY | Looply | Circular-economy resale ("trust layer for Kenyan thrift resale") | Early; live deploy RED (Firebase Hosting failing) | IamAmasai/The-Closet- |
| ENERGY→INFRA | Voltaic | Energy bet #1 (base; IES frontend merged in) | Code + ideas on repo | IamAmasai/Voltaic |
| ENERGY→INFRA | Ubunifu Clouds | Cloud infrastructure bet | Investor plan exists in files | — |
| ENERGY→INFRA | Local AI infra | Open models on local hardware, hybrid local-first + cloud escalation | Unnamed, undated | — |
| GOVERNANCE | ansai-core | The heart: governing docs, shared primitives, Tier-1 agent constitution, blackboard | Live | Ansai-technologies/ansai-core |

### Organization

**Departments (4 + Labs):** Product & Engineering · Studios (client services + all creative/content) · Marketing & Sales · Finance & Ops · **Labs** (incubator, not a department — ideas live as repos, agents build iteratively, founder graduates or kills).

**The Baraza (agent council):** Kiongozi (chair) · Tangaza (M&S) · Mhandisi Mkuu (P&E) · Msanii (Studios) · Hazina (F&O) · Mpelelezi (Labs scout). Departmental councils mix voices across departments; blackboard (`council/log.md` + `council/state.md`) is the shared sync.

**Staffing model:** MIX — Melchizedek in weekly timeblocks (P&E 35%, Studios 35%, M&S 15%, Labs 10%, F&O 5%); agents work continuously; Kiongozi assigns when he is away. Founder confirmation loop: nothing marked done on assumption.

### Money (as-is)

- **Studios client work is the funding engine.** Template: the Wincost proposal — KSh 60,000 all-in, hosting capped at KSh 10,000/yr, 30/30/40 split (PROPOSED only — Ian Limo said 2026-09-24 it is still being considered; no deal, no revenue).
- **Studios live revenue today: zero.** 21/21 pitches sent (2026-09-23), no human replies yet.
- Personal savings = bridge only. Outside capital waits until a pillar genuinely demands it.

### Agent & data stack (as-is)

- **Orchestration:** Agno primary, LangGraph escape hatch. **Models:** DeepSeek workhorse, Gemini fallback/multimodal; chair + leads on stronger models, workers on cheap ones.
- **Deploy:** all-serverless (Vercel + Supabase).
- **Coordination:** blackboard live in ansai-core; Makao Makuu internal HQ (departments, CV/job pipeline, campaign monitoring).
- **Doctrine:** Dira entry 01 (Digital Infrastructure — the philosophy) + entry 02 (builders' playbook — the how), recorded 2026-09-24.

### Tracks running in parallel

1. **Employers** — his job hunt (Canonical submitted, Farmer's Choice sent, JKUAT closed).
2. **Customers** — Studios campaign 02 (21/21 sent; follow-up touches not yet written).
3. **Grants** — Jim Leech fellowship (he submits by Dec 1), MWF 2027 (he submits by Oct 13).

---

## TO-BE — what we want to achieve

### The ecosystem, completed

A self-sustaining community ecosystem funded by itself. Sectors are pillar-building moves, never blind entries — money and build sequence are designed around **pillar completion**. Cheap pillars fund the expensive ones.

### The product thesis (Dira 01, built out)

Nothing we ship is "just a website" or "just an app." Every artifact is **infrastructure**: a node in the client's environment that emits data and ingests data — customers come through it, staff work through it, AI crawlers come through it (and Cloudflare's crawler-monetization rails, maturing from pay-per-crawl toward pay-per-answer, turn that into a revenue line).

**The company stack** (same six steps for every client engagement):

1. **Capture** — every data generator in the environment (customers, staff, website, app, events, records).
2. **Clean & organize** — until the data is trustworthy.
3. **Store** — in a proper database the company owns.
4. **Internal tools** — for tracking data and work.
5. **Mini agents** — one personal agent per person, helping with day-to-day work.
6. **The mother agent** — one overseeing agent with the full picture, coordinating the mini agents.

**The human part:** we restructure how people work and think, not just what software they run. Teaching the thinking is part of the delivery.

**The individual:** personal agents on **private micro-clouds** — small owned infrastructure where a person's data lives without fear of takeover. Data ownership is the trust moat.

**Everything becomes intelligent:** intelligent school operations (EduManage's trajectory), AI-driven agriculture (the named next frontier), and the same treatment for every sector touched.

**The seam:** AI/AGI phases jobs out and creates new ones. Ansai builds at that seam — the infrastructure, agents, and thinking for both companies and individuals.

### The agent & data substrate (Dira 02, built out)

- **Gateway:** OpenRouter or self-hosted LiteLLM in front of everything — never call providers directly from product code. Route by task (cheap model for classification, strong model for reasoning), fall back across providers. Hedge against any single lab changing prices or terms.
- **Connective tissue:** MCP servers exposing client tools (credential vaulting, allowlists, HITL approvals, audit trail); Agent Skills (SKILL.md) packaging repeatable workflows; A2A as the natural protocol for the mother-agent → mini-agent hierarchy.
- **Durability:** Temporal-pattern durable execution (checkpoint/resume) for long runs — validated as a decacorn category (Temporal $550M at $12.55B, Sep 2026).
- **Reliability:** the 3-layer eval pyramid (deterministic unit tests → LLM-judge scenario tests → continuous production evals); Doer-Verifier harnesses; least-privilege agent identities; human-in-the-loop on irreversible actions; cost-per-success as the key metric. Verification, not generation, is the scarce resource.
- **Channel:** WhatsApp *is* the business internet in Kenya — the agent lives in WhatsApp, the dashboard is secondary. Every flow designed from day one around the Oct 1, 2026 per-message pricing (~KSh 0.52/msg in Kenya): batch, be concise, resolve in-window.
- **Africa-first constraints:** offline-first (on-device small models — AfriqueGemma-4B, AfriSLM — plus SMS/USSD fallbacks); dollar-denominated token costs against Kenyan purchasing power (small local models for routine, caching, cheap-vs-expensive routing); M-Pesa as the payment rail; the Swahili/Sheng conversational data flywheel as a genuine moat nobody else is collecting.
- **Regulation watch:** Kenya ODPC draft AI guidance (DPIA triggers, 72h notification); Kenya AI Bill 2026 (Senate Bill No. 4) — KICTANet review says the current draft would make the standard API-dependent dev model "technically noncompliant." Tracked closely; it cuts directly at how we build.

### The wedge → scale path

1. **WhatsApp agent runtime for SACCOs/SMEs** — the wedge. Every SACCO already runs on WhatsApp groups; member-service agents + organized data behind them. Customer pays from day one.
2. **Vertical agritech data flywheel** — capture farm-level data through agents, organize it, sell the intelligence back.
3. **African-language eval & data studio** — the Swahili/Sheng gap as a business: eval datasets, fine-tuning data, testing harnesses.
4. **Offline clinic/school agents** — on-device small models where connectivity can't be assumed.
5. **M-Pesa/KRA MCP marketplace** — Kenyan business integrations (payments, tax, SMS) as agent-usable tools. Boring, lucrative, defensible.
6. **Enterprise agent reliability layer** — evals, guardrails, HITL approvals, audit trails as a product (verification-as-scarce-resource, productized).
7. **USSD/SMS-fallback gateway** — one API letting any agent reach users with no smartphone and no data.

Plus the substrate bets: **Ubunifu Clouds** (own cloud infrastructure; investor plan exists) and **Local AI infrastructure** (open models on local hardware, hybrid local-first + cloud escalation).

### The data flywheel, stated plainly

Capture → label → train → deploy → capture. Whoever owns the capture point in a vertical owns the flywheel. Our capture points — WhatsApp conversations, school operations data, SACCO transactions — are African verticals the Valley isn't watching. The market already prices this: data-for-agents is where the money went (Scale, Databricks, Snorkel, Temporal). We sell the outcome (the school runs better), not the technology (the agent stack) — applied AI is where African capital flows (<2% of H1 2026 funding went to AI-native).

---

## THE BRIDGES — how as-is becomes to-be

| # | Bridge | As-is | To-be | What moves it |
|---|---|---|---|---|
| 1 | First revenue | Studios at zero; 21 pitches sent, no replies | Paying client proves the infrastructure thesis | Follow-up touches (4–5, breakup last) → first deal on the Wincost template |
| 2 | Inspect loop | Convention-based; Looply PR merged before verdict once | Structural (branch protection) → agents ship safely at speed | His merge of The-Bell PR #1; GitHub Pro/Team decision |
| 3 | Capture points | WhatsApp groups, school ops, SACCO txns — uninstrumented | Every data generator captured → flywheel starts | Wedge product (WhatsApp SACCO runtime) deployed in 3–5 paid pilots |
| 4 | Agent substrate | Agno + DeepSeek/Gemini, blackboard sync | Gateway + MCP + Skills + durable execution + evals on everything shipped | Phase 1 integration roadmap (Dira 02 §6) |
| 5 | Cloud ownership | All-serverless on Vercel + Supabase | Ubunifu Clouds; local AI infra | Revenue first — outside capital waits until a pillar demands it |
| 6 | Legal form | Business name, below VAT threshold | Ltd when revenue nears threshold | Tripwire fires on revenue, not on ambition |

**Deferred, deliberately:** training our own models; agent micropayments (x402 is hype-flagged — only 0.6–7.5% of volume actually agentic); dependence on pay-per-crawl revenue (still closed beta).

---

## Open questions (for discussion)

- Which wedge do we actually build first — the SACCO WhatsApp runtime, or a paid school pilot under EduManage's trust-anchor position?
- What does "pillar completion" mean concretely for COMMUNITY first — which product has to be genuinely working before we touch the next?
- When does Studios stop being the funding engine and start being one department among equals?
- What is the mother agent's first real deployment — a client company, or Ansai itself (the Baraza grown up)?
- Kenya AI Bill 2026: at what point does the watching brief become a build constraint?

*Sources: company-structure.md v1 (2026-09-23); Dira entries 01–02 (2026-09-24); research reports `~/workspace/research_notes/agent-first-digital-infrastructure-20260924-1130/` and `~/workspace/research_notes/engineering-writers-ai-theses-20260924-1138/`.*
