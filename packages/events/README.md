# @ansai/events

Typed event emitter primitive for the Ansai ecosystem. Thin wrapper around Node's `EventEmitter` that enforces an event-name → payload-type map.

Exports:
- `AnsaiEmitter<EventMap>` — define an interface like `{ 'fee.paid': FeePaidEvent }` and the emit/on signatures will be checked.

Skeleton package. No EduManage code uses this yet — it ships ahead of the events use cases that will land with the data pipeline.
