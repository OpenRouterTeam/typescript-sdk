# Sort

## Example Usage

```typescript
import { Sort } from "@openrouter/sdk/models";

let value: Sort = "throughput";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"price" | "throughput" | "latency" | Unrecognized<string>
```