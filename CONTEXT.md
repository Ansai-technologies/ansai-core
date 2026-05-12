# Ansai Core — CONTEXT.md
# The Ubiquitous Language of the Ansai Ecosystem

Version: 1.0
Date: May 2026
Status: Active

Every term used in code, documents, and agent sessions
is defined here. One meaning per term. Globally enforced.

When a term appears in any Ansai codebase, document,
or agent session — this file is the authority on
what it means. No outside interpretation is permitted.

---

## Core Platform Terms

**Tenant**
An institution granted isolated access to an Ansai product.
All data generated within a tenant belongs exclusively
to that institution. Ansai holds it in trust, not ownership.
At the platform level a tenant is always an institution —
never an individual.
Examples: a school in EduManage, a farm cooperative
in the agriculture product, a clinic in the health product.

**Actor**
Any identity operating within the Ansai ecosystem,
defined by a role, a permission scope, and an audit trail.
From the platform perspective all actors are structurally
identical regardless of domain context.
The domain determines the role.
The platform treats all actors identically at the
infrastructure level.
Examples: a bursar, a principal, a parent, a platform admin,
a farm manager, a clinic administrator.

**Module**
A self-contained functional unit within a product line
that owns its own data schema, API surface, and UI surface.
Modules do not reach into each other's data directly.
All cross-module communication goes through defined interfaces.
A module that reaches into another module's data is a
design violation — not a shortcut.

**Primitive**
A composable building block provided by Ansai Core that
any product line can use without modification.
Primitives have no product-specific logic.
If a primitive needs product-specific logic, extract it
into a product-level wrapper — never modify the primitive.
Examples: @ansai/auth, @ansai/tenancy, @ansai/roles.

**Tributary**
A product line's data pipeline flowing anonymized insights
into Ansai Ziwa.
Each product line has exactly one tributary.
Raw data never leaves the tenant.
Insights flow upward. Data stays local.
The tributary carries what can be learned, not what
was recorded.

**Artifact**
Any structured output produced by an action in the system.
Code, decisions, field reports, meeting outcomes,
agent broadcasts, ADRs, PRDs, changelogs.
If it is not an artifact it does not exist in the
queryable company.
A decision that is not written did not happen.
A bug report in a WhatsApp message is not an artifact.

---

## Infrastructure Names

**Ansai Core**
The shared infrastructure layer.
The @ansai/ packages every product line inherits.
The heart that everything else pumps from.
Lives in the ansai-core repository.
Changes here affect every product simultaneously.

**Ansai Insight**
The company operating system.
Intelligence, coordination, data-driven decisions.
Internal first, product eventually. Built on Ansai Core.
MCP protocol. Async coordination. One source of truth,
two views — machine interface and human UI.
Octopus architecture:
- Ansai Insight — the main instance, the head
- Insight ED — EduManage local instance
- Insight AG — Agriculture product local instance
- Insight HL — Health product local instance
- Insight FL — Logistics product local instance
Distilled signals flow from local instances to the
main instance. Engineers see granular detail locally.
Leadership sees the essential picture at the top.

**Ansai Dira**
The knowledge and navigation surface.
The docs site. What engineers navigate by.
What the CFO reads. What the world sees.
Source lives in the ansai-dira repository.
Deployed to docs.ansaitechnologies.co.ke

**Ansai Ziwa**
The intelligence lake.
Where all tributaries from all products converge.
The compounding data asset that grows with every
institution that joins the ecosystem.
Raw data never enters Ziwa directly.
Only anonymized, structured insights flow here.
What flows outward from Ziwa is packaged intelligence —
not raw records.

---

## Operational Standards

**Operational infrastructure**
The systems that make the day-to-day running of an
institution possible — the things an institution needs
to function every single day, not occasionally.
The test: if this product went offline for a week,
would the institution feel it in daily operations?
If yes — that is infrastructure.
An Ansai product that could be easily stopped using
is not infrastructure. It is an app.
Ansai does not build apps.

**Product line**
A domain of institutional service under Ansai Technologies.
EduManage is the Education product line.
A product line can contain multiple products over time.
Distinct from "product" which refers to a specific
deployable system within a line.

**Local-first · Sync-always · Backup-automated · Loss-never**
The mandatory data architecture standard for every
Ansai product line handling institutional data.
No exceptions.
Local-first: data written to device immediately,
server sync happens in background.
Sync-always: continuous background sync,
30-second maximum gap for critical data.
Backup-automated: three layers minimum, no manual processes.
Loss-never: data entered offline must never be lost.

**2G-first**
The connectivity design standard.
Every feature is designed for 2G connectivity first.
Fibre is the upgrade path, not the assumption.
Every kilobyte costs real money.
Failure states are designed, not ignored.
Offline is the baseline. Online sync is the enhancement.

**Critical path**
The minimum set of functionality that must have 100%
test coverage before any institution handles real data.
The four critical paths across all product lines:
financial data, authentication, tenant isolation,
data sync.
No product line launches without critical path
tests passing.

**AI adoption scale**
Eight levels from L1 (writes by hand) to L8
(builds own orchestrator).
L5 is Ansai minimum. L6 is target hire.
L5: CLI single agent, reviews output not generation.
L6: CLI multi-agent 3-5 parallel.
When evaluating engineering work, reference this scale.

**Vertical slice**
A thin cut through the entire stack that delivers
something testable end to end.
Schema change → API endpoint → UI surface → Test.
All four in one slice before the next slice begins.
Features are built as vertical slices.
Never as horizontal layers.

**Deep module**
A module with a large amount of functionality
behind a simple interface.
The opposite of a shallow module — which exposes
complexity without absorbing it.
All Ansai modules are designed as deep modules.

**Domain ownership**
One engineer owns one domain completely within
a product line.
No code merges into a domain without the domain
owner's review.
The domain owner is the surgeon.
The Mshauri Engineer is the sensor who surfaces
field issues to the domain owner.

**Enabling stack**
The technological substrate built by Ubunifu Village
and deployed across all Ansai product lines.
AI, IoT, edge infrastructure, Chain, robotics, quantum.
Built from the products outward — no layer is built
before the product lines that justify it exist.
Sequence is discipline.

---

## Ubunifu Village Divisions

**Ubunifu Cloud**
Owned compute and storage. The software layer.
Builds and operates the infrastructure Ansai runs on.
Operational within 12 months.
12-month artifact: first owned cloud space
running live products.

**Ubunifu AI**
The intelligence layer.
Builds domain-specific models trained on Ansai data.
Powers Ansai Insight and product-level intelligence.
Operational within 12 months.
12-month artifact: first models trained on EduManage
data producing verifiable institutional intelligence.

**Ubunifu Energy**
Power infrastructure for micro data centres
and physical deployments.
Internal first — powers Ansai's own hardware
before becoming a commercial product.
Operational within 12 months.
12-month artifact: first microgrid powering
Ansai's own hardware.

**Ubunifu Infra**
Physical infrastructure of all kinds.
Not just cloud hardware.
Micro data centres, networking equipment,
IoT device fabrication, hardware components.
Infra makes things. Cloud runs things on what
Infra makes. The boundary is hardware versus software.
Operational within 12 months.
12-month artifact: first micro DC operational.

**Ubunifu Studios**
Storytelling, documentation, Ansai Dira.
The human face of everything Ubunifu builds.
Operational within 12 months.
12-month artifact: Ansai Dira live, company narrative
established, EduManage marketing materials produced.

**Ubunifu Chain**
Trust, identity, non-repudiation, data integrity.
The infrastructure underneath every governance
agreement between Ansai and the institutions it serves.
Operational within 12 months.
12-month artifact: Chain integrated into EduManage's
data governance layer providing immutable
agreement records.

**Ubunifu Quantum**
Long horizon research. Frontier only.
Quantum computing principles, quantum-inspired
optimisation. No 12-month artifact required.

**Ubunifu Smart Systems**
IoT, sensing, automation, smart city infrastructure.
Frontier for now. Operational when agriculture
product begins building.

**Ubunifu Economics**
Financial infrastructure primitives, economic modeling.
Frontier for now. Feeds into digital economies product.

---

## People and Culture Terms

**Utu Engineering**
Building with full awareness of the human being
on the other side of every screen.
Every feature decision starts with a named human being —
not a user story, not a persona. A specific person.
The question is always: who specifically is this for
and what does their day look like?
Source: GCC-001. Root conviction: GWP-001 Section 1.

**Named human being**
The alternative to user story or user persona.
Every feature must be built for a specific named person —
the bursar at a specific school, the farmer in a
specific county.
Features built for abstract users produce abstract software.
Features built for named human beings produce infrastructure.

**Mshauri Engineer**
The trusted adviser model.
Every engineer is assigned 3-5 institutions as their
physical field responsibility.
Monthly minimum visit cadence.
Purpose: observation, not sales.
The Mshauri Engineer watches people work, takes notes,
and returns with what was heard.
The Mshauri Engineer is the sensor.
The domain owner is the surgeon.

**Pamoja**
How the Ansai team works. Horizontally, without
hierarchy of importance. Shared ownership of outcomes.
Disagreement surfaces immediately and without
political consequence. Bad news travels fast.
Hierarchy of decision authority exists —
one person owns each domain.
Hierarchy of human worth does not exist —
every person's contribution matters equally.
These two are not in conflict.

**Async-first**
90% of communication is written before discussed.
Decisions, bug reports, feedback, architectural choices —
documented as artifacts before any verbal discussion.
Writing forces clarity. Async creates the queryable company.
If it is not written it did not happen.

---

## Product Codes

Two letters. Used in document prefixes and
Insight instance naming.

| Code | Product line |
|------|-------------|
| ED | EduManage |
| AG | Agriculture product (name pending) |
| HL | Health product (name pending) |
| FL | Logistics product (name pending) |

---

## Naming Conventions

**Global namespace — ansai- prefix**
@ansai/auth, @ansai/tenancy, @ansai/roles,
@ansai/pipeline, @ansai/events, @ansai/audit.
Any engineer seeing ansai- knows: shared infrastructure,
treat with care, changes affect every product.

**Product namespace — product code prefix**
edu-fees, edu-attendance, agri-soil, agri-harvest.
Product-specific. Local scope.
Changes affect only that product line.

**Internal namespace — no prefix**
FeeCalculator, AttendanceRecord.
Private to a module. Never crosses module boundaries.

**Document prefix system**
G — Group level. GWP, GID, GEP, GCC, GFP, GLP.
U — Ubunifu Village level.
P — Product level. PED, PAG, PHL, PFL.
ADR — Architectural Decision Record, numbered globally.
AGENTS.md and CONTEXT.md — always in capitals,
always this exact name. No variation.

---

## Financial Terms

| Term | Definition |
|------|------------|
| MRR | Monthly Recurring Revenue |
| Burn rate | Total monthly cash outflow |
| Runway | Months of operating capital at current burn |
| CAC | Customer Acquisition Cost per institution |
| LTV | Lifetime Value per institution |
| Churn rate | Percentage of institutions cancelling monthly |
| Collection rate | Transaction completion rate across all institutions |

These seven numbers are reported monthly per product line.
Visible to all team members within the product line.

**Depth over breadth**
Ten institutions that depend on an Ansai product daily
are worth more than a hundred that log in monthly.
Revenue quality over revenue quantity.
Institutional dependency is the goal.

**Infrastructure pricing**
Pricing like infrastructure, not SaaS.
Predictable, affordable relative to value delivered,
structured around the institution's actual operating
cycles — school terms, harvest seasons, fiscal years.

**Cost centre**
Every product line operates as its own cost centre
from its first transaction. Revenue and costs attributed
per product line from day one regardless of legal structure.

---

## Document Authority Chain

**Layer 0 — GWP-001**
The root. Convictions about human beings, Africa,
and building. Everything inherits from this.
No document contradicts this layer.

**Layer 1 — Group documents**
GID-001, GEP-001, GCC-001, GFP-001, GLP-001.
Govern everything. Non-negotiable across all product lines.
Nothing downstream may contradict these.

**Layer 2 — Product documents**
AGENTS.md and CONTEXT.md in each product repo.
PRDs, plans, changelogs. Inherit from Layer 1.
Fill in product-specific detail.
Never contradict the parent layer.

**Layer 3 — Operating documents**
STATUS.md, DECISIONS.md, HEALTH.md, CHANGELOG.md.
Living documents. Updated frequently.
Week-to-week operational records.

When a conflict appears between layers —
the higher layer always wins.
This is not negotiable and not subject to interpretation.

---

## Amendment Record

Changes to this document follow Category 1 governance
for new term additions and Category 3 governance for
redefining existing terms, as defined in AGENTS.md.
All amendments logged in AMENDMENTS.md.
