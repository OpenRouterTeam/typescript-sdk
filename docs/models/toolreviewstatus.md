# ToolReviewStatus

Marketplace review status for a tool engine.

## Example Usage

```typescript
import { ToolReviewStatus } from "@openrouter/sdk/models";

let value: ToolReviewStatus = "approved";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"unreviewed" | "pending" | "approved" | "rejected" | "suspended" | Unrecognized<string>
```