# QualityTier

Quality tier for model selection. Higher tiers select from stronger coding models (sourced from Artificial Analysis coding benchmarks). Valid values depend on `num_tiers`: 3 tiers → low/medium/high, 4 tiers → low/medium/high/xhigh, 5 tiers → low/medium/high/xhigh/xxhigh. Omit to use the highest active tier.

## Example Usage

```typescript
import { QualityTier } from "@openrouter/sdk/models";

let value: QualityTier = "high";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"low" | "medium" | "high" | "xhigh" | "xxhigh" | Unrecognized<string>
```