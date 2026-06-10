# Sort

Sort the returned models server-side. Prefer this over fetching the full list and sorting client-side. Options: pricing-low-to-high, pricing-high-to-low (average prompt/completion price), context-high-to-low (context length), throughput-high-to-low, latency-low-to-high (recent median performance), most-popular, top-weekly (tokens processed in the last week), newest (creation date). When omitted, the existing default ordering is preserved.

## Example Usage

```typescript
import { Sort } from "@openrouter/sdk/models/operations";

let value: Sort = "newest";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"most-popular" | "newest" | "top-weekly" | "pricing-low-to-high" | "pricing-high-to-low" | "context-high-to-low" | "throughput-high-to-low" | "latency-low-to-high" | Unrecognized<string>
```