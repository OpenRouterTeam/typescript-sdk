# WorkspaceBudgetInterval

Budget reset interval. Use "lifetime" for a one-time budget that never resets.

## Example Usage

```typescript
import { WorkspaceBudgetInterval } from "@openrouter/sdk/models";

let value: WorkspaceBudgetInterval = "monthly";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"daily" | "weekly" | "monthly" | "lifetime" | Unrecognized<string>
```