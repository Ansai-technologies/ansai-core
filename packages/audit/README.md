# @ansai/audit

Prisma extension that automatically logs CREATE/UPDATE/DELETE mutations to an `auditLog` table, attributed to the user from the @ansai/tenancy RequestContext.

Exports:
- `prismaAuditExtension` — pass to `prisma.$extends()` once at app startup.

Requirements on the consumer's Prisma schema:
- An `AuditLog` model with fields `userId: Int`, `action: String`, `entityType: String`, `entityId: Int`, `changes: Json`, `ipAddress: String?`.

Self-audit is suppressed: writes to `AuditLog` are never themselves audited (infinite-loop guard).
