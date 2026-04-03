# GuardrailResetInterval

Interval at which the limit resets (daily, weekly, monthly)

## Example Usage

```typescript
import { GuardrailResetInterval } from "@openrouter/sdk/models";

let value: GuardrailResetInterval = "monthly";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"daily" | "weekly" | "monthly" | Unrecognized<string>
```