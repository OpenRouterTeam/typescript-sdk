# Schema1

## Example Usage

```typescript
import { Schema1 } from "@openrouter/sdk/models";

let value: Schema1 = "latency";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"price" | "throughput" | "latency" | Unrecognized<string>
```