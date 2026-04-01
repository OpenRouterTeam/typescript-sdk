# UsageLimitType

Optional credit limit reset interval. When set, the credit limit resets on this interval.

## Example Usage

```typescript
import { UsageLimitType } from "@openrouter/sdk/models/operations";

let value: UsageLimitType = "monthly";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"daily" | "weekly" | "monthly" | Unrecognized<string>
```