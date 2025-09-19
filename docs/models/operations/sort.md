# Sort

The sorting strategy to use for this request, if "order" is not specified. When set, no load balancing is performed.

## Example Usage

```typescript
import { Sort } from "open-router/models/operations";

let value: Sort = "throughput";
```

## Values

```typescript
"price" | "throughput" | "latency"
```