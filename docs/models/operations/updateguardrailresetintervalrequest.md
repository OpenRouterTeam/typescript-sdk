# UpdateGuardrailResetIntervalRequest

Interval at which the limit resets (daily, weekly, monthly)

## Example Usage

```typescript
import { UpdateGuardrailResetIntervalRequest } from "@openrouter/sdk/models/operations";

let value: UpdateGuardrailResetIntervalRequest = "monthly";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"daily" | "weekly" | "monthly" | Unrecognized<string>
```