# GuardrailInterval

Interval at which the limit resets (daily, weekly, monthly)

## Example Usage

```typescript
import { GuardrailInterval } from "@openrouter/sdk/models";

let value: GuardrailInterval = "monthly";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"daily" | "weekly" | "monthly" | Unrecognized<string>
```