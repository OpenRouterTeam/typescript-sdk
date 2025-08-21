# ChatCompletionCreateParamsSort

The sorting strategy to use for this request, if "order" is not specified. When set, no load balancing is performed.

## Example Usage

```typescript
import { ChatCompletionCreateParamsSort } from "open-router/models";

let value: ChatCompletionCreateParamsSort = "price";
```

## Values

```typescript
"price" | "throughput" | "latency"
```