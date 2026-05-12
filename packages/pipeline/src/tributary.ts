/**
 * Tributary — a per-product feed of structured events flowing
 * into the Ansai Ziwa data lake.
 *
 * Skeleton: events are currently logged to stdout and discarded on
 * flush(). Real implementation will batch and ship to Ziwa once
 * Ziwa is built.
 */
export class Tributary {
  constructor(private productCode: string) {}

  emit(eventType: string, payload: object): void {
    console.log(`[ansai/pipeline] ${this.productCode}:${eventType}`, payload);
  }

  async flush(): Promise<void> {
    // no-op until Ansai Ziwa is built
  }
}
