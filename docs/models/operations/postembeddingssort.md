# PostEmbeddingsSort

The sorting strategy to use for this request, if "order" is not specified. When set, no load balancing is performed.

## Example Usage

```typescript
import { PostEmbeddingsSort } from "@openrouter/sdk/models/operations";

let value: PostEmbeddingsSort = "price";
```

## Values

```typescript
"price" | "throughput" | "latency"
```