# The Ansai Paper — Thesis, Decisions, Progress
*29 Oct 2026 — a living record of what Ansai Technologies believes, what it has decided, and what it has built so far.*

## 1. The thesis

Ansai Technologies is a technology and engineering company based in Nairobi, founded by Melchizedek Amasai. Its founding thesis is not a single product, a single sector, or a single market. It is the building of a self-sustaining community ecosystem.

The ecosystem rests on three pillars. The first is SPACE: land, water, and air. The second is COMMUNITY: economics, education, governance, and wellbeing. The third is ENERGY → INFRA: energy, and the infrastructure it makes possible. No fixed sector sequence follows from these pillars. A sector is not an end in itself; it is a pillar-building move. Sequence and money are therefore designed around pillar completion, not around sector fashion or isolated opportunity.

Across those pillars, the unifying thesis is attestation infrastructure as a service. Ansai uses trust only as descriptor language — the trust layer — never as the product name. The product is Attest. The category is attestation infrastructure. The work rests on four primitives: verified identity, tamper-evident records, payment history, and audit trails.

Products, in this view, are faces of that infrastructure rather than separate inventions. In the present mapping, Tuma is the commercial face, EduManage the institutional face, and ArdhiX the land face. Different faces may serve different pillars, but they draw on the same underlying question: how does an institution know who acted, under whose authority, on what evidence, and can that be proved later?

This matters because the economy is becoming agent-native. Agents will hold money, sign things, speak for companies, and act inside institutions. That is not a world that can run on assertion alone. It runs on infrastructure: identity for agents, limits on what they may do, payment rails they can use, and proof of everything they did.

Agent-native does not mean a chatbot bolted onto an existing organisation. It means core operations are carried out by agents inside an organisation, under its authority, and on its own data. The distinction is authority and attribution. An action must be attributable: who acted, under whose authority, on what evidence, and provable later. Without that chain, agent activity is only activity. With it, an institution can delegate work and still answer for the result.

Ansai therefore builds agent-native companies and restructures existing ones into agent-native form. It also builds the infrastructure such companies require. Those are outcome-level commitments, not claims about a particular internal tool. A new company can be designed from the start with agents carrying core operations under clear authority. An existing company can be restructured so that the same test applies: identity before action, limits before delegation, and a record for everything consequential.

Internally, Ansai operates as a factory. At principle level, that means agents that build agents, agents that build software, and agents that build infrastructure, with human gates for irreversible acts. The factory is the operating model, not the public offer. Its purpose is discipline in how work is produced: who or what produced it, under what limits, and where a human must decide before an act cannot be undone.

The guardrails follow from the thesis. Money never moves on an agent's word. Identity comes before action. Agents operate with least privilege. Everything leaves a record. Evals come before promotion. Humans hold the irreversible. Data sovereignty is a constraint, not a feature. Phone-first is treated as reality, not as an afterthought. These are not decorative principles; they are the conditions under which delegation remains legitimate.

This is grounded, first, in place. Ansai is a Nairobi company building for institutions that must carry their own authority and answer for their own records. Data sovereignty and phone-first reality shape the infrastructure from the beginning: identity, records, payment history, and audit trails must work where institutions actually operate, with the devices people actually use, and without surrendering control of the underlying records as the price of using agents.

The public boundary is equally clear. Publicly, Ansai speaks in the language of a technology and engineering ecosystem: outcomes, products, and proof. Its public sites include ansaitechnologies.co.ke and The Engineer's Journal. Internal machinery is not the public offer. What belongs in public is what was built, what it does, who it serves, and what evidence supports the claim. What does not belong in public is the internal arrangement by which the work was produced.

The thesis can therefore be stated plainly. Build the pillars. Build the attestation infrastructure they share. Build companies in which agents can do core work inside institutions, under authority, within limits, and with proof. Keep humans responsible for the irreversible. Keep the record. That is the standard by which Ansai's later decisions and progress should be judged.

## 2. The playbook

Five shared moves connect the products, each tested against outside research before adoption at Ansai scale.

| Move | At Ansai | Research verdict |
|---|---|---|
| One identity | Ansai ID is live as a service at id.ansaitechnologies.co.ke, with hash-only enrolment, domain-scoped sessions and a shared cookie domain intended to replace per-app passcode sessions. It recognises a person everywhere on the domain while permission remains per product; enrolment after bootstrap is vouching by an enrolled person, recovery is re-vouch, never an email reset link, agent bindings refuse unenrolled humans, and step-up freshness applies to gated actions. Founder enrolment and product cutovers are next, so no product is claimed to use it yet. | Borrow as-is: one account opens everything and actor chain, so every agent action carries its originating human identity. Adapt SPIFFE principles without running SPIRE now; identity before action, least privilege, and delegated signing keys bounded by cap, expiry and allowlist. |
| One graph | Shared entities are provisioned in the Looply Supabase project as core_businesses, core_people and core_links; products keep their own tables, and the shared layer holds identity and cross-references only. id_people is the verified identity root, core_people is graph presence, bridged at enrolment via core_people.id_person_id. Beautify by Angel exists once as a core business linked to its Hazina record — one proof link — and no product cutovers have yet been made. | Borrow as-is the Microsoft Graph pattern of shared entities, applied narrowly: one shared layer, product tables intact, and value created through identity plus references rather than forced consolidation. |
| One platform layer | Attest is live: product, domain attestation.ansaitechnologies.co.ke and API POST /attestations align, alongside the agent factory and LiteLLM gateway. Attest is the product; attestation infrastructure is the category; trust is descriptor language only. Factory standards and wallet core exist, but gateway accounting — per-agent spend attribution and tier caps — still has to be operationalised before subsidised economics change. | Borrow as-is: Amazon's API mandate for externalisable internal interfaces, Amazon mechanisms rather than intentions, Anthropic's start-simple discipline, and multi-agent patterns only where value pays the token cost. Adapt a governed gateway at Ansai scale: LiteLLM as one door to models, the chokepoint extended to tools, and spend attributed per agent. |
| One event spine | The shared decision record, product event logs following the hz_events pattern, and the watcher/Sentinel concept stay at principle level. The spine is present in records and logs; live agent communication is still a horizon. Every consequential decision writes its WHY — inputs, rule applied, alternatives rejected, approver — under standard 14, making decision lineage what Attest sells. | Borrow as-is Foundation Capital decision traces, judged highest leverage, plus one audited record for everything and binary approve/reject flows that reduce supervision load. Guardrails live in infrastructure, not prompts, since prompts cannot enforce reliably. |
| One design language + shell | Palette v2, mark family, UI kit, Makao HQ registry and Brand gallery form the move — the strongest connectedness area, with the kit built and major surfaces retrofitted or adopting it. Makao HQ, now watching 22 properties, is the live shell/registry, and Brand gallery carries the mark family. UI-kit standard binds all builds: React uses shadcn/ui + Tailwind where applicable, vanilla/serverless uses the shared kit, accessibility, light theme, phone-first and light payloads bind, new builds are born on it, and existing surfaces adopt as touched. | Adapt Apple consistency without closure: one palette, mark family and kit applied consistently while products stay open. Marketplace lessons are for later. |

Rejected wholesale: vendor-owned context layers are rejected because they violate sovereignty; Google's ad-funded free-consumer playbook is rejected; Meta's move-fast-and-break-things approach is rejected; Klarna-style replacement positioning is rejected; and hyperscale platform engineering before a cash engine is rejected.

## 3. Decisions record

This record lists the settled decisions in chronological order.

- **2026-09-23 — Ecosystem structure thesis set: a self-sustaining community ecosystem across three pillars, with sector order not fixed.** Sectors are pillar-building moves rather than a predetermined sequence, because SPACE covers land, water and air, COMMUNITY covers economics, education, governance and wellbeing, and ENERGY leads to INFRA, so money and sequencing are designed around completing the pillars.
- **2026-09-25–2026-10-25 — Factory stack ratified, including the sovereignty list and standard tooling choices.** Master keys and vault, the Attest signing core and audit archive, institutional raw records, gateway logs and factory records are never held on foreign cloud; Agno is primary with LangGraph as escape hatch, alongside LiteLLM, self-hosted Langfuse, Promptfoo and DeepEval gates, SPIFFE, OPA and RFC 8693 for identity and policy, agent and wallet templates as factory standard v0.1, and REA as a factory tool and reference.
- **2026-10-25 — Platform renamed Attest, with trust retained only as descriptor language.** Trust Engine did not sound technical or engineering enough for the platform name, whereas Attest names the product, attestation infrastructure names the category, and descriptive phrases such as “the trust layer” may explain it without becoming the product name.
- **2026-10-29 — Agent Standards codified as rules 1–10 and extended by rules 11–14.** This consolidated newsletter mining and playbook research into one audited record, a serial one-tool loop, verification inside the committing tool, governed gateway control, binary decisions, list-price economics and decision traces, so consequential agent work is bounded, attributable, reviewable and promoted only after evaluation.
- **2026-10-29 — UI kit standard adopted for every build.** Every build must be modern and appealing: React builds use shadcn/ui and Tailwind patterns where applicable, the vanilla and serverless estate uses the shared Ansai UI kit, and accessibility, light theme, phone-first design and light payloads bind; new builds are born on the standard and existing surfaces adopt it as they are touched or retrofitted.
- **2026-10-29 — Credit and model discipline set for reasoning, dialogue and coding work.** Muse credits are reserved for reasoning and dialogue, coding work goes through the Meta Model API, and generated work is verified before shipping; Spark is the routine code workhorse, while Wonder is used for complex, long-horizon, multi-file and planning- or delegation-heavy work.
- **2026-10-29 — Biometric binding required between agents and a verified human.** This binds agents to a verified human, requires step-up for irreversible actions, keeps raw biometrics and templates within institution infrastructure, and limits Attest and Ansai ID to proof hashes only, preserving attribution and human control without centralising sensitive biometric material.
- **2026-10-29 — Evidence retention rule set for enrolment proof.** Enrolment proof is captured, never typed: identity is provided by upload or camera and face by live camera, the SHA-256 of the capture is the stored proof, images are sighted and discarded for personal enrolments, and a sealed, encrypted, access-logged vault is used only where an institution enrols people and carries a retention duty; fingerprint means a WebAuthn passkey, so the device never surrenders a fingerprint and the service stores the public key.
- **2026-10-29 — IAM and single sign-on model set for Ansai ID.** Ansai ID recognises a person everywhere on the domain while permission remains per product — recognised everywhere, permitted per product — enrolment after bootstrap is by vouching from an enrolled person, and recovery is by re-vouch, never by an email reset link.
- **2026-10-29 — Short public passes set for Job Hunter and Outreach instead of setup or monthly pricing.** Job Hunter costs KSh 199 for three days and up to 30 applications or KSh 399 for seven days and up to 70; Outreach costs KSh 499 for three days and up to 40 prospects or KSh 899 for seven days and up to 100, with allowances stated as plain totals and, where a channel blocks the agent, the user taken to the closest possible point with exactly what remains stated.
- **2026-10-29 — Decision-trace rule adopted as Agent Standard 14.** Every consequential decision writes its WHY — inputs, rule applied, alternatives rejected and approver — because the resulting decision trace is the compounding asset and provides the decision lineage that Attest sells.

## 4. Progress

| Layer | State | Note |
| --- | --- | --- |
| Design language & shell | strongest | UI kit built; major surfaces retrofitted or adopting it; Makao HQ and the Brand gallery are operating. |
| Platform layer | substantial | Attest is live, and factory standards and the wallet core exist; gateway accounting is still to operationalise. |
| Identity | service live, activation pending | The Ansai ID service is live; founder enrolment and product cutovers are the next step. |
| Graph | seeded | Core graph tables and one proof link are live in the Looply Supabase project; adoption phases are ahead. |
| Event spine | present in records, live communication a horizon | A shared decision record and product event logs are present; live agent communication is still a horizon. |
| Distribution | missing organ | No Ansai-owned distribution surface exists yet; the content houses are seeds, and Looply is on hold as a product focus. |

### What is live

- **Attest** — Attest is live, with product, domain and API aligned at attestation.ansaitechnologies.co.ke and `POST /attestations`. Attest is the product; attestation infrastructure is the category, and trust is descriptor language only. It provides the live attestation face for decision lineage: the record of inputs, rule applied, alternatives rejected and approver for consequential decisions. Limit: the platform layer is substantial, not complete — per-agent gateway spend attribution and tier caps are still to operationalise.

- **Hazina, with Hazi embedded** — Hazina is live at hazina.ansaitechnologies.co.ke as the SME bookkeeping product; it went live on 29 Oct. Workspaces, months, ledger, receipts and the close flow are live, and Ask Hazi is grounded in the month record. Packs are stamped with the rules version and input hashes, and activity is written to an audit log. No customer results are claimed from mock figures. The standalone hazi.ansaitechnologies.co.ke surface is a demo/fallback surface, not the product.

- **Ansai ID** — The Ansai ID service is live at id.ansaitechnologies.co.ke, with hash-only enrolment, domain-scoped sessions, agent bindings that refuse unenrolled humans, and step-up freshness for gated actions. It is designed to recognise a person everywhere on the domain, while permission remains per product. Activation is pending: founder enrolment and product cutovers are the next step. No product is claimed to use Ansai ID yet.

- **Agent Store** — The Agent Store is a local/private build; it is not deployed, and no sales are claimed. It names five jobs: Bursar, Shop Agent, Bookkeeper/Hazi, Job Hunter and Outreach. Pricing is Bursar KSh 45,000 setup plus KSh 12,500/month; Shop Agent KSh 15,000 setup plus KSh 3,500/month; Bookkeeper/Hazi KSh 15,000 setup plus KSh 7,500/month. Job Hunter passes are KSh 199 for 3 days and up to 30 applications, or KSh 399 for 7 days and up to 70. Outreach passes are KSh 499 for 3 days and up to 40 prospects, or KSh 899 for 7 days and up to 100. Outcome definitions were added to all five jobs, each with done, evidence and failure.

- **Makao HQ and Brand** — Makao HQ is live as the shell and registry for the estate, and it now watches 22 properties. The Brand gallery carries the mark family. Together they operate the design language and shell, the strongest connectedness layer, with the UI kit built and major surfaces retrofitted or adopting it. Limit: a live shell and registry organise the estate; they do not complete identity activation, graph adoption or distribution.

- **Board** — Board is live as the shared tracker for work across the estate. That gives the products a common tracking surface now. Limit, plainly: a shared tracker does not mean the estate is integrated. Identity cutovers are still pending, the graph is seeded rather than adopted, and live agent communication remains a horizon. Board is operating shared tracking, while the deeper connections are still phased work.

- **Publishing Studio** — Publishing Studio is live and standalone, with its publishing access verified. It is built and armed to publish to The Engineer's Journal and Things We Have Surely Believed. A completed first publish is not claimed. The first real publish is still owed and remains the end-to-end proof, so Studio currently proves ready publishing infrastructure and verified access, not a completed publish to either house.

- **The Engineer's Journal** — The Engineer's Journal is the engineering house, one of the public sites alongside ansaitechnologies.co.ke, and it stays outside company structure. Publishing Studio is armed to publish to it, but no completed first publish through Studio is claimed. As a content house it is a seed for the future; it does not remove the present gap recorded in the scorecard, where distribution is a missing organ.

- **Things We Have Surely Believed** — Things We Have Surely Believed is the faith house, live at surelybelieved.ansaitechnologies.co.ke. It is simplified to writing and corrections: no method page, no tiers and nothing denominational. Publishing Studio is built and armed to publish to it, alongside the Journal, but a completed first publish is not claimed. The house is live; through-Studio publishing and distribution remain unproven.

## 5. Open questions & next horizons

The questions below are open on 29 Oct 2026. Some are policy decisions, some are sequencing decisions, and some are horizons that have not become plans. They are recorded here so that the next edition can distinguish what was settled, what was built, and what remained unresolved.

### Identity enrolment and the role matrix

Ansai ID is live at id.ansaitechnologies.co.ke, with hash-only enrolment, domain-scoped sessions, agent bindings that refuse unenrolled humans, and step-up freshness for gated actions. Product cutovers are still to follow. The next step is enrolment in a stated order: founder first, then Angel.

Enrolment alone does not settle permission. Ansai ID recognises a person everywhere on the domain; permission remains per product. The open policy questions are who may enrol or vouch after bootstrap, who receives which product grants, and who can revoke a grant or a vouch. Whether Angel sits as root or as operator is a founder policy call, not a settled fact. Recovery is re-vouch by an enrolled person, never an email reset link.

### Cutover order

The runbook order is Hazina gate first, then Board, Studio, the Learning Studio mentor side, Ops, and Makao. Each cutover keeps the old gate as a fallback for one release. That matters because identity before action is a guardrail, but a failed gate should degrade to a question or a known route, not to an unrecorded workaround. A cutover is not complete until the product is using Ansai ID in practice and the fallback can be retired on schedule.

### The swarm and the checkpoint

The open governance question is plain: if an agent notices three departments requesting the same supplier's records and wants to merge them into one shared brief, crossing department fences, who says yes — the swarm or the checkpoint?

The standing framing is: the swarm proposes; the checkpoint disposes. Until a human or checkpoint authorises the crossing, signals across fences should be content-free metadata only — that a pattern exists, not what the underlying records contain. This keeps actor chain and least-privilege rules intact: every agent action carries an originating human identity, and consequential decisions need a binary decision point rather than drift by accumulation.

### Distribution: the missing organ

Distribution is recorded as the missing organ. There is no Ansai-owned distribution surface yet, and ecosystem compounding needs one. The content houses are seeds, not that organ, and Looply is on hold as a product focus. YouTube or content as a possible income and discovery route was raised in conversation, but no decision is in the named sources. The open question is what form such a surface should take and who it would serve. It has no adopted plan.

### Gateway accounting

The platform layer is substantial, but gateway accounting still has to be operationalised. The governed gateway is LiteLLM as one door to models, with the chokepoint extended to tools. Before subsidised economics change, it needs per-agent spend attribution and tier caps, with economics assessed at list price per task. The question is not only what a call costs, but which agent incurred it, for which job, and under whose authority.

### Passkey slice

After capture-based enrolment, the next identity slice is fingerprint sign-in through a WebAuthn passkey. Enrolment proof is captured, never typed, with a SHA-256 hash of the capture stored as proof and images sighted and discarded for personal enrolments. The fingerprint never leaves the device; the service stores the public key. Agent binding ties an agent to a verified human, with step-up for irreversible actions, and Attest and Ansai ID keep proof hashes only.

### Agent-world horizon

A persistent world for agents, with VR/AR as a human interface and connections to real-world value, actuators, and payment rails, remains an idea under rumination. It is not a product claim and has no build sequence in the sources. Its place here is as a horizon question: what would such a world require from identity, limits, rails, and proof that agent-native work inside institutions does not already require?

The next edition of this paper should be able to say who was enrolled and in what order, what role matrix was settled and who holds revoke authority, which products completed cutover and retired their fallback gates, how the checkpoint answered the supplier-brief case, what distribution surface was decided or deferred, whether gateway accounting attributes spend per agent under tier caps, whether the passkey slice is in use, and whether the agent-world idea was taken up, narrowed, or set aside.
