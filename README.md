# ansai-core
Ansai Core is the shared infrastructure layer of the  Ansai Technologies ecosystem.

# Ansai Core

The shared infrastructure layer of the Ansai Technologies ecosystem.

Ansai Core is the heart that everything else pumps from.
Every Ansai product line inherits from this repository.
Every agent session across the ecosystem loads from here first.
Changes here affect everything. Treat accordingly.

---

## What lives here

**Governing documents** — the foundational documents that
define what Ansai is, how it builds, and what it believes.
Every product line inherits these without modification.

**Platform primitives** — the @ansai/ packages that every
product line imports. Auth, tenancy, roles, data pipeline,
events, audit. Written once. Maintained here. Used everywhere.

**The agent constitution** — AGENTS.md is the Tier 1 context
file loaded by every AI agent working anywhere in the
Ansai ecosystem. It is the first thing every agent reads.

---

## Reading order for new engineers

Read these in sequence before writing a single line of code.

1. `docs/culture/GWP-001.md`
   What Ansai believes about human beings, Africa, and building.
   The root of everything.

2. `docs/culture/GID-001.md`
   Who Ansai is, what we build, and the sectors we serve.
   The identity layer.

3. `docs/culture/GCC-001.md`
   How the Ansai team works together.
   The culture you inherit on day one.

4. `docs/culture/GEP-001.md`
   The technical standards every product line must meet.
   Non-negotiable engineering principles.

5. `CONTEXT.md`
   Every term used in the ecosystem defined precisely.
   One meaning per term. Read this before writing code.

6. `AGENTS.md`
   How AI agents operate within the Ansai ecosystem.
   Read this before starting any agent-assisted build session.

7. `docs/decisions/`
   The architectural decisions that shaped this system.
   Read relevant ADRs before touching any established pattern.

---

## Repository structure

ansai-core/
├── AGENTS.md              ← Tier 1 agent constitution
├── CONTEXT.md             ← Ubiquitous language
├── ARCHITECTURE.md        ← System map
├── STATUS.md              ← Weekly pulse
├── AMENDMENTS.md          ← Constitutional change record
├── README.md              ← This file
│
└── docs/
├── culture/           ← Founding documents
│   ├── GWP-001.md     ← Worldview principles
│   ├── GID-001.md     ← Group identity
│   ├── GCC-001.md     ← Culture constitution
│   ├── GEP-001.md     ← Engineering principles
│   └── GFP-001.md     ← Financial philosophy
│
├── decisions/         ← Architectural Decision Records
│   └── ADR-001.md     ← First ADR (multi-tenant schema)
│
├── context/           ← Tier 2 domain documents
│   └── (fetched by agents on domain trigger)
│
└── monitoring/
├── HEALTH.md      ← System health record
└── DECISIONS.md   ← Daily decisions log

---

## The inheritance model

Ansai Core is the roots and trunk.
Product repositories are the branches.

Every product repository:
- Reads global AGENTS.md before local AGENTS.md
- Imports @ansai/ packages without modification
- Extends CONTEXT.md with product-specific domain terms
- Never contradicts any document in this repository

Changes to Ansai Core propagate to every product simultaneously.
This is the compounding advantage.
It is also the responsibility.

---

## Package namespace

All shared packages are scoped under @ansai/:
@ansai/auth       Authentication and session management
@ansai/tenancy    Multi-tenant isolation engine
@ansai/roles      Role-based access control
@ansai/pipeline   Data tributary to Ansai Ziwa
@ansai/events     Event emission and subscription
@ansai/audit      Audit logging across all products

Any engineer seeing @ansai/ knows:
shared infrastructure, treat with care,
changes affect every product line.

---

## Amendment governance

Changes to AGENTS.md or CONTEXT.md follow the
three-category amendment process defined in AGENTS.md.
All changes are logged in AMENDMENTS.md.

No constitutional rule changes without human ratification.
No ratification without the cooling-off period.
No amendment without a permanent record.

---

*Ansai Technologies · Nairobi, Kenya*
*ansaitechnologies.co.ke*
