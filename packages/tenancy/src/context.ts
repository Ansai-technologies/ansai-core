import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  userId?: number;
  schoolId?: number | null;
  ip?: string;
}

export const contextStorage = new AsyncLocalStorage<RequestContext>();

export function getContext(): RequestContext | undefined {
  return contextStorage.getStore();
}
