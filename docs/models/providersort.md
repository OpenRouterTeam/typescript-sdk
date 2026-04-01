# ProviderSort

The provider sorting strategy (price, throughput, latency)

## Example Usage

```typescript
import { ProviderSort } from "@openrouter/sdk/models";

let value: ProviderSort = "price";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"price" | "throughput" | "latency" | "exacto" | Unrecognized<string>
```