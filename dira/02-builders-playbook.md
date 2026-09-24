# Dira — Entry 02: The builders' playbook (AI-native & agentic-native infrastructure)

*Recorded 2026-09-24. This entry is the "how" companion to Entry 01's "what/why". Distilled from deep research across engineering writers, AI data startups, developer platforms, and Africa-first building realities. Sources are named inline; open questions are marked plainly.*

---

## 1. What the best engineering writers agree on

**Gergely Orosz (The Pragmatic Engineer)** — "Slow down to speed up." Agents changed engineering faster than leadership adapted: 5x PRs, 2.5x code, 3x larger PRs vs 18 months ago; Anthropic runs 70–90% Claude-generated code. Individual productivity is up, team productivity is flat, quality is dropping. His core claim: **verification is the scarce resource**, not generation. Review the plan/tests/schema, not the implementation; triage reviews by blast radius (the OpenAI/Anthropic approach). Prediction worth noting: CI/CD flips from speed to risk-reduction — more, slower tests.

**Petar Ivanov (The T-Shaped Dev)** — "An agent is mostly not a model." The model is a probabilistic core inside a deterministic machine, and you engineer the machine: the 3-layer testing pyramid — deterministic unit tests for the substrate, LLM-judge scenario tests, continuous evals in production. Never mock the model and assert on the mock.

**ByteByteGo** — pattern-first: RAG vs agents is a decision rule (RAG = one retrieval + one generation: cheap, predictable, debuggable; agents = reasoning loop with tools: use only when the task needs it). For production: observability from day one, split read vs write operations into different architectures, and put an MCP gateway in front of tools (credential vaulting, allowlists, human-in-the-loop approvals, audit trail).

**Where they converge:** production AI is systems engineering, not prompting. Humans stay in the loop on high-risk actions. Separate the concerns: the model, the machine around it, and the durability layer. Pick the cheapest pattern that works.

## 2. The money trail: AI data startups that exploded

The market is screaming one thing: **data for agents is where the money is.**

- **Scale AI** — Meta paid $14.3B for 49% (June 2025, ~$29B valuation) and took CEO Alexandr Wang to lead its superintelligence effort, with a $450M/yr 5-year commitment. Then Google, Microsoft, OpenAI, and xAI pulled back or reassessed. The lesson: Scale's neutrality *was* the product — selling a stake to one lab destroyed it. For us: never build a data business dependent on a single model provider.
- **Databricks** — raised ~$5B at a $134B valuation (Dec 2025/Feb 2026), $5.4B ARR run rate, 65% growth, $1.4B of that AI revenue; reportedly raising again at $188B (July 2026). The data warehouse became the AI platform.
- **Snorkel AI** — $350M Series E at $3.5B (Sep 22, 2026, two days before this writing), from ~$20M to a $350M revenue run rate. They call it the "agentic data development platform": Data 2.0 = expert-designed tasks, environments, and rubrics for training agents, not just labeling images.
- **Temporal** — $550M Series E at $12.55B (Sep 2026), $250M ARR, OpenAI its biggest customer. Durable execution (checkpoint/resume for long-running workflows) is now a decacorn category. This validates our agent-factory substrate choice directly.
- **LangChain** — $125M at $1.25B (Oct 2025); LangGraph 1.0, "agent engineering" framing.
- **Cloudflare** — pay-per-crawl is still in closed beta (launched July 2025, still not GA as of Sep 2026, $0.001/crawl minimum); in July 2026 they pivoted toward pay-per-answer. From Sep 15, 2026, new and free-tier domains block AI training/agent crawlers by default. The website-as-revenue-generating-data-asset thesis is real but early — we build for it, we don't depend on it yet.

**The data flywheel, stated plainly:** capture → label → train → deploy → capture. Whoever owns the capture point in a vertical owns the flywheel. Our capture points are WhatsApp conversations, school operations data, SACCO transactions — African verticals the Valley isn't watching.

**Africa's own trail:** InstaDeep → BioNTech (~$550M, completed Jan 2023); Aerobotics $26M+; DataProphet $16M; Intella (Egypt) $16.9M; Sama (Kenya) ~$85M. African AI startups raised $1.25B between Jan 2019 and Mar 2025. But: AI-native startups got <2% of African funding in H1 2026 — the money flows to *applied* AI. Lesson: sell the outcome (the school runs better), not the technology (the agent stack).

## 3. The three developer platforms: how we use each

**Anthropic (Claude) — the agent builder's platform.** Claude API with Opus 5.5 ($4 input / $20 output per million tokens), Sonnet 5 ($2/$10), Haiku 4.5 ($1/$5). The real assets for us: **Agent Skills** (open standard since Dec 2025 — SKILL.md + scripts + references, progressive disclosure; works across Claude Code, Cursor, OpenClaw), **MCP** (donated to the Agentic AI Foundation; 97M downloads, 10,000+ enterprise servers), and 1M-token context on the flagship. Use Claude where agent reliability matters most — the orchestrator, the reviewer, the mother agent.

**Google (Gemini) — the cost-efficient workhorse.** Gemini 3.6 Flash at $0.75/$3.75 per million tokens (intro pricing through Dec 2026, then $1.50/$7.50); 2.5 Flash around $0.30/$2.50. AI Studio has a free tier; Vertex AI is the enterprise path (no perpetual free tier, but zero-training-data-retention by default — matters for client data). Agent Development Kit (ADK) is open-source with native A2A support; Gemini CLI is free (1,000 requests/day). Use Gemini for high-volume worker tasks — classification, extraction, drafting.

**Meta — the channel, not (yet) the model.** WhatsApp Business Cloud API: access itself is free, no paid middleman required. **Critical, dated fact: from Oct 1, 2026, service messages inside the 24-hour window — previously free — become charged at ~$0.004 (about KSh 0.52) per message in Kenya.** Every WhatsApp agent we ship must be designed around this pricing from day one: batch, be concise, resolve in-window. (Meta's model API details we could not verify this run — treat Llama as the self-host weights story: Ollama/vLLM for local inference.)

**The multi-model gateway:** never call providers directly from product code. OpenRouter (one key, 400+ models, free tier) or self-hosted LiteLLM (MIT, your keys, fallbacks/cooldowns/retries) in front of everything. Route by task: cheap model for classification, strong model for reasoning, fallback across providers when one is down. This is also our hedge against any single lab changing prices or terms.

## 4. Building in Africa: the nuanced playbook

Africa is not a constrained version of the Valley playbook. It is a different game with different winning moves.

- **Connectivity:** only about a third of Africans have regular internet; 70% of phones are entry-level smartphones. Architect offline-first: on-device small models (AfriqueGemma-4B covers 24 languages; Tether's AfriSLM runs 19 African languages fully offline), SMS/USSD fallbacks for anything critical, sync when connected.
- **Cost:** token prices are set in dollars against Kenyan purchasing power. Control it structurally: small local models for the routine, caching (semantic cache on repeated queries), routing cheap-vs-expensive by task difficulty, self-hosted Llama via Ollama/vLLM where volume justifies it.
- **Interface:** WhatsApp *is* the business internet in Kenya. The agent lives in WhatsApp; the dashboard is secondary. M-Pesa is the payment rail — Safaricom already embeds edge-AI mini-apps inside the M-Pesa app (Fastagger), and MSME AI credit scoring (Numida, JUMO, Pezesha, Tala, Branch) proves the pattern.
- **Language:** Swahili is the best-supported African language in LLMs and still data-scarce; open models drop 20+ points on African languages (AfroBench). Our own data flywheel in Swahili/Sheng business conversations is a genuine moat — nobody else is collecting it.
- **Regulation:** Kenya's ODPC issued draft AI guidance (July 2026) with DPIA triggers and 72-hour breach notification; the proposed Kenya AI Bill 2026 (Senate Bill No. 4) would, per KICTANet's legal review, make the dominant API-dependent dev model "technically noncompliant." Track this closely — it cuts directly at how we build.
- **Capital:** Gates Foundation committed $1B over two years for AI in healthcare, education, and agriculture in developing regions. Grant capital exists for the applied-AI story; venture capital for AI-native is still thin (<2% of H1 2026 funding).

## 5. Possible directions (Africa-first)

1. **WhatsApp agent runtime for SACCOs/SMEs** — the wedge: every SACCO already runs on WhatsApp groups; give them member-service agents + organized data behind it. Customer pays from day one.
2. **Vertical agritech data flywheel** — capture farm-level data through agents, organize it, sell the intelligence back. Agriculture is the named next frontier.
3. **African-language eval & data studio** — the Swahili/Sheng gap is a business: eval datasets, fine-tuning data, and testing harnesses for anyone shipping AI in East Africa.
4. **Offline clinic/school agents** — on-device small models where connectivity can't be assumed; EduManage's intelligent-school-ops thesis extended to health.
5. **M-Pesa/KRA MCP marketplace** — every Kenyan business integration (payments, tax, SMS) packaged as agent-usable tools. Boring, lucrative, defensible.
6. **Enterprise agent reliability layer** — evals, guardrails, human-in-the-loop approvals, audit trails as a product for companies deploying agents (Orosz's "verification is the scarce resource," productized).
7. **USSD/SMS-fallback gateway** — one API that lets any agent reach users with no smartphone and no data. The unsexy infrastructure nobody builds and everybody needs.

## 6. The integration roadmap (sequenced)

- **Phase 1 (now):** WhatsApp Cloud API as the channel; OpenRouter or LiteLLM as the gateway; Gemini free tier + Flash for volume; Claude for the reasoning core. Design every WhatsApp flow around the Oct 1 per-message pricing.
- **Phase 2:** MCP servers exposing client tools; Agent Skills packaging our repeatable workflows; durable execution (Temporal-pattern: checkpoint/resume) for long runs; the 3-layer eval pyramid on everything we ship.
- **Defer:** training our own models, agent micropayments (x402 is hype-flagged — only 0.6–7.5% of its volume is actually agentic per TRM Labs, about half of it gamed), pay-per-crawl dependence.

## 7. Open questions

- Meta's model API (dev.meta.ai) product details and pricing — unverified this run.
- Whether API providers accept M-Pesa for billing (cards assumed) — unverified.
- Labelbox/Weaviate/Unstructured/Inngest recent raises — not sourced this run.
- The final shape of Kenya's AI Bill — in Senate; KICTANet review says the current draft criminalizes the standard dev model. Watching brief.
