# ProviderPreferencesPartition

Partitioning strategy for sorting: "model" (default) groups endpoints by model before sorting (fallback models remain fallbacks), "none" sorts all endpoints together regardless of model.

## Example Usage

```typescript
import { ProviderPreferencesPartition } from "@openrouter/sdk/models";

let value: ProviderPreferencesPartition = "model";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"model" | "none" | Unrecognized<string>
```