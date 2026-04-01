# CreateGuardrailResetIntervalRequest

Interval at which the limit resets (daily, weekly, monthly)

## Example Usage

```typescript
import { CreateGuardrailResetIntervalRequest } from "@openrouter/sdk/models/operations";

let value: CreateGuardrailResetIntervalRequest = "monthly";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"daily" | "weekly" | "monthly" | Unrecognized<string>
```