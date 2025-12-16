# ProviderSort

## Example Usage

```typescript
import { ProviderSort } from "@openrouter/sdk/models";

let value: ProviderSort = "price";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"price" | "throughput" | "latency" | Unrecognized<string>
```