# Ansai Core — ARCHITECTURE.md
# The System Map

Version: 1.0
Date: May 2026
Status: Active
Updated: When major structural decisions are made only.

This document is one page. It describes how the entire
Ansai ecosystem connects. It does not describe
implementation details — those live in ADRs and
product-level documentation.

---

## The three-thing-that-is-one

Ansai is three things that compound each other permanently.

**Ansai Core**
The shared infrastructure layer.
The @ansai/ packages. The governing documents.
The agent constitution.
Everything inherits from here.
Nothing product-specific lives here.

**Ansai Products**
The institutional product lines.
EduManage, and every product that follows.
Each one built on Ansai Core.
Each one feeding intelligence into Ansai Ziwa
through its tributary.

**Ansai Insight**
The company operating system.
Built on Ansai Core.
Sees everything — agent activity, product health,
financial pulse, constitutional proposals.
Internal first, product eventually.

---

## The ecosystem map
                UBUNIFU VILLAGE
    ┌─────────────────────────────────────┐
    │  Cloud · AI · Infra · Energy        │
    │  Studios · Chain · Quantum          │
    │  Smart Systems · Economics          │
    └──────────────┬──────────────────────┘
                   │ builds the substrate
                   ▼
          ┌─────────────────┐
          │   ANSAI CORE    │
          │                 │
          │  @ansai/auth    │
          │  @ansai/tenancy │
          │  @ansai/roles   │
          │  @ansai/pipeline│
          │  @ansai/events  │
          │  @ansai/audit   │
          └────────┬────────┘
                   │ inherited by
      ┌────────────┼────────────┐
      ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│EduManage │ │ AgriX    │ │HealthLink│  ...more
│          │ │          │ │          │
│ Insight  │ │ Insight  │ │ Insight  │
│   ED     │ │   AG     │ │   HL     │
└────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │
     └────────────┼────────────┘
                  │ tributaries flow to
                  ▼
          ┌───────────────┐
          │  ANSAI ZIWA   │
          │               │
          │  Intelligence │
          │  Lake         │
          └───────┬───────┘
                  │ packaged intelligence surfaces in
                  ▼
          ┌───────────────┐
          │ ANSAI INSIGHT │
          │  (main head)  │
          │               │
          │ Engineers     │
          │ CFO           │
          │ Mshauri Eng.  │
          └───────────────┘

---

## The GitHub organization
ansai-technologies/ (private org)
│
├── ansai-core/          ← This repository
├── edumanage/           ← Education product line
├── ansai-dira/          ← Docs site source
├── ansai-infra/         ← Deployment and IaC (future)
└── [future product repos follow edumanage pattern]

---

## The inheritance model

**Global to local — always in this order:**

Every agent session reads:
1. ansai-core/AGENTS.md — the global constitution
2. [product]/AGENTS.md — the local extension

Every product imports:
1. @ansai/ packages — without modification
2. Product-specific modules — on top of primitives

Every document hierarchy:
1. GWP-001 → GID-001 → GCC/GEP/GFP → Product docs
2. Higher layer always wins on conflict

---

## The data flow

**Institutional data — always stays local to tenant:**
Institution → Local device → Product database
Scoped by tenant ID. Never crosses tenant boundaries.
Never leaves without explicit institutional consent.

**Intelligence — flows upward anonymized:**
Product database → Tributary (@ansai/pipeline)
→ Ansai Ziwa → Ansai Insight → Actionable intelligence

**Agent context — flows downward:**
ansai-core/AGENTS.md → Product AGENTS.md
→ Agent session → Code output → Tests → Deploy

**Constitutional amendments — flow through governance:**
Pattern observed → Insight surfaces proposal
→ Human reviews → Consent obtained → Amendment ratified
→ AMENDMENTS.md updated → Constitution updated

---

## The build sequence
NOW                EduManage scaling. First paying schools.
GitHub org live. Ansai Core scaffolded.
Founding documents being written.
MONTHS 1-3         Ansai Core extraction sprint.
@ansai/auth, @ansai/tenancy, @ansai/roles
extracted from EduManage.
EduManage imports from Core.
Tests run continuously throughout.
MONTHS 3-6         Ansai Dira live.
AGENTS.md complete and active.
First ADRs written.
Ubunifu Energy building first microgrids.
Ansai Insight MVP scoped.
MONTHS 6-12        Agriculture product begins after
domain expert conversations complete.
First micro DC operational.
Ansai Insight MVP running internally.
Ubunifu Chain integrated into EduManage.
Ubunifu AI first models training.
MONTHS 12-18       Agriculture soft pilots.
Health sector domain conversations begin.
Ansai Insight being refined toward
eventual product launch.
MONTHS 18-24       Second and third products launching.
Ansai Insight approaching product readiness.

---

## Key architectural decisions

Formal decisions are recorded as ADRs in docs/decisions/.
The significant ones are referenced here for orientation:

ADR-001 — Multi-tenant shared schema
ADR-002 — Authentication approach
ADR-003 — Ansai Core extraction decision
ADR-004 — MCP as Ansai Insight protocol

Read the relevant ADR before touching any
established pattern. Never re-decide a decided decision
without understanding why it was made.

---

*Updated only when major structural decisions are made.*
*Minor updates go in DECISIONS.md and relevant ADRs.*
