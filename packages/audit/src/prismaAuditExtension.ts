import { Prisma } from '@prisma/client';
import { getContext } from '@ansai/tenancy';

// Local shape for the AuditLog write. The consumer's PrismaClient is
// expected to provide an `auditLog` model with this contract.
interface AuditPrismaClient {
  auditLog: {
    create(args: {
      data: {
        userId: number;
        action: string;
        entityType: string;
        entityId: number;
        changes: unknown;
        ipAddress: string | null;
      };
    }): Promise<unknown>;
  };
}

/**
 * Prisma extension that automatically logs CREATE/UPDATE/DELETE mutations
 * (and the createMany/updateMany/deleteMany/upsert variants) to an
 * `auditLog` table. Uses the @ansai/tenancy RequestContext to attribute
 * the change to a specific user.
 */
export const prismaAuditExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    query: {
      $allModels: {
        async create({ model, args, query }) {
          const result = await query(args);
          await logOperation(client as unknown as AuditPrismaClient, 'CREATE', model, result);
          return result;
        },
        async update({ model, args, query }) {
          const result = await query(args);
          await logOperation(client as unknown as AuditPrismaClient, 'UPDATE', model, result, args.data);
          return result;
        },
        async delete({ model, args, query }) {
          const result = await query(args);
          await logOperation(client as unknown as AuditPrismaClient, 'DELETE', model, result);
          return result;
        },
        async upsert({ model, args, query }) {
          const result = await query(args);
          const typedResult = result as { createdAt?: Date; updatedAt?: Date };
          const action = typedResult.createdAt && typedResult.updatedAt && typedResult.createdAt === typedResult.updatedAt
            ? 'CREATE'
            : 'UPDATE';
          await logOperation(client as unknown as AuditPrismaClient, action, model, result, args.update);
          return result;
        },
        async createMany({ model, args, query }) {
          const result = await query(args);
          await logOperation(client as unknown as AuditPrismaClient, 'CREATE', model, { count: (result as { count: number }).count }, args.data);
          return result;
        },
        async updateMany({ model, args, query }) {
          const result = await query(args);
          await logOperation(client as unknown as AuditPrismaClient, 'UPDATE', model, { count: (result as { count: number }).count }, args.data);
          return result;
        },
        async deleteMany({ model, args, query }) {
          const result = await query(args);
          await logOperation(client as unknown as AuditPrismaClient, 'DELETE', model, { count: (result as { count: number }).count });
          return result;
        },
      },
    },
  });
});

async function logOperation(
  prisma: AuditPrismaClient,
  action: string,
  model: string,
  result: any,
  changes?: any
) {
  const context = getContext();

  // Skip if no user context (e.g., seeding or system tasks)
  if (!context?.userId) return;

  // Avoid infinite loops by not auditing AuditLog itself
  if (model === 'AuditLog') return;

  try {
    await prisma.auditLog.create({
      data: {
        userId: context.userId,
        action,
        entityType: model.toLowerCase(),
        entityId: result.id || 0,
        changes: changes ? (changes as any) : (result as any),
        ipAddress: context.ip || null,
      },
    });
  } catch (err) {
    // Fail silently to avoid breaking the main operation
    console.error(`[Audit Extension Error] Failed to log ${action} on ${model}:`, err);
  }
}
