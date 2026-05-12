import type { FastifyRequest, FastifyReply } from 'fastify';
import { ROLE_PERMISSIONS } from './roles.js';
import type { Action, Entity } from './permissions.js';

interface RolesUser {
  role: string;
}

/**
 * Middleware factory that asserts the authenticated user's role
 * has the given action on the given entity.
 * Returns 403 with a human-readable message on denial.
 */
export function checkPermission(entity: Entity, action: Action) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const role = (request as unknown as { user: RolesUser }).user.role;
    const permissions = ROLE_PERMISSIONS[role];

    if (!permissions || !permissions[entity]?.includes(action)) {
      return reply.code(403).send({
        error: 'Forbidden',
        message: `You do not have permission to ${action.toLowerCase()} ${entity.toLowerCase()}s`,
      });
    }
  };
}
