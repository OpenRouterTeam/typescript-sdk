# ChatRequestPartition

Partitioning strategy for sorting: "model" (default) groups endpoints by model before sorting (fallback models remain fallbacks), "none" sorts all endpoints together regardless of model.

## Example Usage

```typescript
import { ChatRequestPartition } from "@openrouter/sdk/models";

let value: ChatRequestPartition = "model";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"model" | "none" | Unrecognized<string>
```