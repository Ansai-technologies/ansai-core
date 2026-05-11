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
