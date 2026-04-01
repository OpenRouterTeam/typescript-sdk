# ProviderPreferencesPartition

Partitioning strategy for sorting: "model" (default) groups endpoints by model before sorting (fallback models remain fallbacks), "none" sorts all endpoints together regardless of model.

## Example Usage

```typescript
import { ProviderPreferencesPartition } from "@openrouter/sdk/models";

let value: ProviderPreferencesPartition = "model";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"model" | "none" | Unrecognized<string>
```