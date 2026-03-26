# UsageLimitType

Optional credit limit reset interval. When set, the credit limit resets on this interval.

## Example Usage

```typescript
import { UsageLimitType } from "@openrouter/sdk/models/operations";

let value: UsageLimitType = "monthly";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"daily" | "weekly" | "monthly" | Unrecognized<string>
```