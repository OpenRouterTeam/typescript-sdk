# PriceSource

Price source for the Pareto frontier cost axis. "prompt" uses catalog list price (endpoint.pricing.prompt). "weighted_avg" uses traffic-weighted effective input price from ClickHouse, falling back to prompt price for models without traffic data. Defaults to "prompt".

## Example Usage

```typescript
import { PriceSource } from "@openrouter/sdk/models";

let value: PriceSource = "prompt";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"prompt" | "weighted_avg" | Unrecognized<string>
```