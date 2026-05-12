# @ansai/tenancy

Tenant isolation primitives for Ansai product lines. Provides the `tenantGuard` Fastify middleware that enforces non-platform users have a valid `schoolId` (or tenant equivalent) and verifies the tenant's billing status before allowing access. Also exposes the `AsyncLocalStorage`-based request context (`contextStorage`, `getContext`, `RequestContext`) used by audit logging and other context-aware primitives.

Treat tenancy violations as gross violations per the Ansai Constitution. Every change here requires human review.
