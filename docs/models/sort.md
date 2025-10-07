# Sort

The sorting strategy to use for this request, if "order" is not specified. When set, no load balancing is performed.

## Example Usage

```typescript
import { Sort } from "@openrouter/sdk/models";

let value: Sort = "throughput";
```

## Values

```typescript
"price" | "throughput" | "latency"
```