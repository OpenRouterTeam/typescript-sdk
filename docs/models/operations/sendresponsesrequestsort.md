# SendResponsesRequestSort

The sorting strategy to use for this request, if "order" is not specified. When set, no load balancing is performed.

## Example Usage

```typescript
import { SendResponsesRequestSort } from "@openrouter/sdk/models/operations";

let value: SendResponsesRequestSort = "latency";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"price" | "throughput" | "latency" | Unrecognized<string>
```