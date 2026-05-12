import { EventEmitter } from 'events';

/**
 * Strongly typed event emitter.
 * Define an event map (`{ eventName: PayloadType }`) and the emit/on
 * signatures will enforce it at the call site.
 */
export class AnsaiEmitter<T extends Record<string, unknown>> extends EventEmitter {
  override emit<K extends keyof T & string>(event: K, payload: T[K]): boolean {
    return super.emit(event, payload);
  }

  override on<K extends keyof T & string>(event: K, listener: (payload: T[K]) => void): this {
    return super.on(event, listener);
  }

  override off<K extends keyof T & string>(event: K, listener: (payload: T[K]) => void): this {
    return super.off(event, listener);
  }
}
