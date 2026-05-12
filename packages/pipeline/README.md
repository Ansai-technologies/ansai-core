# @ansai/pipeline

Data tributary primitive for the Ansai ecosystem. Each product opens a `Tributary` and emits structured events that flow into the Ansai Ziwa data lake.

Exports:
- `Tributary(productCode)` — construct one per product (e.g. `'EDU'`).
- `tributary.emit(eventType, payload)` — emit a domain event.
- `tributary.flush()` — drain pending events.

Skeleton package. `emit` currently writes to stdout; `flush` is a no-op. Real shipping logic lands once Ansai Ziwa is built.
