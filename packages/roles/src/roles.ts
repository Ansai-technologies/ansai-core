import type { Action, Entity } from './permissions.js';

/**
 * Role → entity → allowed actions matrix.
 * Mirrors the frontend usePermissions matrix in EduManage.
 * Backend uses UPPERCASE entities/actions; frontend uses lowercase.
 * Any new entity or permission added here must also be added to the
 * frontend matrix (and vice versa).
 */
export const ROLE_PERMISSIONS: Record<string, Partial<Record<Entity, Action[]>>> = {
  SUPER_ADMIN: {
    STUDENT: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    STAFF: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    FEE: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    AUDIT: ['VIEW', 'MANAGE'],
    ATTENDANCE: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    CLASS: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    DORM: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    EXAM: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    SUBJECT: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    ASSET: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    SCHOOL: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    TRANSPORT: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    BEHAVIOUR_LOG: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
  },
  PRINCIPAL: {
    STUDENT: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    STAFF: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    FEE: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    AUDIT: ['VIEW'],
    ATTENDANCE: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    CLASS: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    DORM: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    EXAM: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    SUBJECT: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    ASSET: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    SCHOOL: ['VIEW', 'UPDATE'],
    TRANSPORT: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
    BEHAVIOUR_LOG: ['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
  },
  DEPUTY: {
    STUDENT: ['VIEW', 'CREATE', 'UPDATE'],
    STAFF: ['VIEW'],
    FEE: ['VIEW'],
    ATTENDANCE: ['VIEW', 'CREATE', 'UPDATE'],
    CLASS: ['VIEW'],
    DORM: ['VIEW'],
    EXAM: ['VIEW', 'CREATE', 'UPDATE'],
    SUBJECT: ['VIEW'],
    INVENTORY: ['VIEW'],
    TRANSPORT: ['VIEW', 'CREATE', 'UPDATE'],
    BEHAVIOUR_LOG: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
  },
  TEACHER: {
    STUDENT: ['VIEW', 'CREATE', 'UPDATE'],
    ATTENDANCE: ['VIEW', 'CREATE', 'UPDATE'],
    CLASS: ['VIEW'],
    EXAM: ['VIEW', 'CREATE', 'UPDATE'],
    SUBJECT: ['VIEW'],
    BEHAVIOUR_LOG: ['VIEW', 'CREATE', 'UPDATE'],
  },
  BURSAR: {
    STUDENT: ['VIEW'],
    FEE: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
    ASSET: ['VIEW', 'CREATE', 'UPDATE'],
    TRANSPORT: ['VIEW'],
  },
  STOREKEEPER: {
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
  },
  CATERESS: {
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE'],
  },
  TRANSPORT_MANAGER: {
    TRANSPORT: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
    ASSET: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE'],
  },
  DRIVER: {
    TRANSPORT: ['VIEW', 'CREATE', 'UPDATE'],
  },
  MECHANIC: {
    TRANSPORT: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
    ASSET: ['VIEW', 'UPDATE'],
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE'],
  },
  ESTATE_MANAGER: {
    TRANSPORT: ['VIEW'],
    ASSET: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
  },
  FARM_MANAGER: {
    ASSET: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
  },
  PROCUREMENT_OFFICER: {
    TRANSPORT: ['VIEW'],
    ASSET: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
  },
  NURSE: {
    STUDENT: ['VIEW'],
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE'],
  },
  LIBRARIAN: {
    ASSET: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
  },
  LAB_TECHNICIAN: {
    ASSET: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
  },
  SECURITY_OFFICER: {
    STUDENT: ['VIEW'],
  },
  MAINTENANCE_OFFICER: {
    TRANSPORT: ['VIEW', 'CREATE', 'UPDATE'],
    ASSET: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
    INVENTORY: ['VIEW', 'CREATE', 'UPDATE'],
  },
  DORM_MASTER: {
    STUDENT: ['VIEW', 'UPDATE'],
    DORM: ['VIEW', 'CREATE', 'UPDATE', 'MANAGE'],
    BEHAVIOUR_LOG: ['VIEW', 'CREATE', 'UPDATE'],
  },
  WORKER: {
    // Limited or no access to student data
  },
};
