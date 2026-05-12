# @ansai/roles

Role-based access control primitive for the Ansai ecosystem.

Exports:
- `ROLE_PERMISSIONS` — the role → entity → actions matrix (19 roles, 14 entities, 5 actions).
- `checkPermission(entity, action)` — fastify middleware factory that returns 403 with a human-readable message when the authenticated user's role is not allowed the action on the entity.
- `Action`, `Entity` — the union types backing the matrix.

The frontend must mirror this matrix (in EduManage: `client/src/hooks/usePermissions.ts`). Backend uses UPPERCASE; frontend uses lowercase. Any change here must be replicated there and vice versa.
