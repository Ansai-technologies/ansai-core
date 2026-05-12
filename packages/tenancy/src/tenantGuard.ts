import { FastifyRequest, FastifyReply } from 'fastify';

// In-memory cache for school status checks (avoids DB hit on every request)
const schoolStatusCache = new Map<number, { status: string; expiresAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCachedSchoolStatus(schoolId: number): string | null {
  const entry = schoolStatusCache.get(schoolId);
  if (entry && entry.expiresAt > Date.now()) return entry.status;
  if (entry) schoolStatusCache.delete(schoolId);
  return null;
}

function setCachedSchoolStatus(schoolId: number, status: string): void {
  schoolStatusCache.set(schoolId, { status, expiresAt: Date.now() + CACHE_TTL_MS });
}

// Minimal shapes the guard needs. Consumers augment FastifyRequest['user'] and
// FastifyInstance['prisma'] themselves; @ansai/tenancy stays generic.
interface TenancyUser {
  role: string;
  schoolId: number | null;
}

interface TenancyPrismaClient {
  school: {
    findUnique(args: { where: { id: number }; select: { status: true } }): Promise<{ status: string } | null>;
  };
}

/**
 * Tenant guard middleware.
 * After authenticate, verifies non-platform users have a schoolId
 * and that their school has an accessible billing status.
 * Allowed statuses: ACTIVE, TRIAL (full access), OVERDUE (grace period).
 * Blocked: SUSPENDED, CHURNED, DEACTIVATED → 402/403.
 */
export async function tenantGuard(request: FastifyRequest, reply: FastifyReply) {
  const { role, schoolId } = (request as unknown as { user: TenancyUser }).user;

  // Platform-level roles operate outside of any school
  if (role === 'SUPER_ADMIN' || role === 'OWNER' || role === 'SALES_REP') return;

  if (!schoolId) {
    return reply.code(403).send({ error: 'No school associated with this account' });
  }

  // Check cache first
  const cachedStatus = getCachedSchoolStatus(schoolId);
  if (cachedStatus) {
    if (cachedStatus === 'SUSPENDED' || cachedStatus === 'CHURNED') {
      return reply.code(402).send({
        error: 'School access suspended due to billing. Please contact support or the school administrator.',
        schoolStatus: cachedStatus,
      });
    }
    if (cachedStatus !== 'ACTIVE' && cachedStatus !== 'TRIAL' && cachedStatus !== 'OVERDUE') {
      return reply.code(403).send({ error: 'Your school account is not active' });
    }
    return;
  }

  // Cache miss — query DB
  const prisma = (request.server as unknown as { prisma: TenancyPrismaClient }).prisma;
  const school = await prisma.school.findUnique({
    where: { id: schoolId },
    select: { status: true },
  });

  if (!school) {
    return reply.code(403).send({ error: 'School not found' });
  }

  setCachedSchoolStatus(schoolId, school.status);

  if (school.status === 'SUSPENDED' || school.status === 'CHURNED') {
    return reply.code(402).send({
      error: 'School access suspended due to billing. Please contact support or the school administrator.',
      schoolStatus: school.status,
    });
  }

  if (school.status !== 'ACTIVE' && school.status !== 'TRIAL' && school.status !== 'OVERDUE') {
    return reply.code(403).send({ error: 'Your school account is not active' });
  }
}

/**
 * Extract schoolId from the authenticated user's JWT.
 * Returns null for SUPER_ADMIN users.
 */
export function getSchoolId(request: FastifyRequest): number | null {
  return (request as unknown as { user: TenancyUser }).user.schoolId;
}

/**
 * Extract schoolId and assert it is non-null.
 * Use this in routes that are behind tenantGuard and not accessible to SUPER_ADMIN.
 * Throws if schoolId is null (should never happen behind tenantGuard).
 */
export function requireSchoolId(request: FastifyRequest): number {
  const schoolId = (request as unknown as { user: TenancyUser }).user.schoolId;
  if (schoolId == null) {
    throw new Error('schoolId is required but was null');
  }
  return schoolId;
}
