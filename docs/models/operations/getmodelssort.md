# GetModelsSort

Sort the returned models server-side. Prefer this over fetching the full list and sorting client-side. Options: pricing-low-to-high, pricing-high-to-low (average prompt/completion price), context-high-to-low (context length), throughput-high-to-low, latency-low-to-high (recent median performance), most-popular, top-weekly (tokens processed in the last week), newest (creation date), intelligence-high-to-low (Artificial Analysis intelligence index), design-arena-elo-high-to-low (best Design Arena ELO across arenas). Models without a score for the chosen benchmark are placed last. When omitted, the existing default ordering is preserved.

## Example Usage

```typescript
import { GetModelsSort } from "@openrouter/sdk/models/operations";

let value: GetModelsSort = "newest";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"most-popular" | "newest" | "top-weekly" | "pricing-low-to-high" | "pricing-high-to-low" | "context-high-to-low" | "throughput-high-to-low" | "latency-low-to-high" | "intelligence-high-to-low" | "design-arena-elo-high-to-low" | Unrecognized<string>
```