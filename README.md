# Ansai Core

The shared infrastructure layer — the `@ansai/` packages every product line inherits.

This repository contains the composable primitives that all Ansai product lines (EduManage, and future Agriculture, Health, Logistics lines) build on top of. Primitives have no product-specific logic. Changes here affect every product simultaneously.

## Packages

- `@ansai/tenancy` — Tenant isolation middleware and request context
- `@ansai/auth` — JWT, bcrypt, refresh token primitives
- `@ansai/roles` — Role-based access control matrix and middleware
- `@ansai/audit` — Prisma audit extension for mutation logging
- `@ansai/events` — Typed event emitter
- `@ansai/pipeline` — Tributary interface for Ansai Ziwa (stub)

## Governance

Read `AGENTS.md` and `CONTEXT.md` before making any change. These are inherited from the Ansai constitution.
