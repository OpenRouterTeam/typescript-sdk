# DisplayFormat

How this metric value should be formatted for display (e.g. percent → multiply by 100 and append %, currency → prefix with $)

## Example Usage

```typescript
import { DisplayFormat } from "@openrouter/sdk/models/operations";

let value: DisplayFormat = "number";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"number" | "currency" | "percent" | "latency" | "throughput" | Unrecognized<string>
```