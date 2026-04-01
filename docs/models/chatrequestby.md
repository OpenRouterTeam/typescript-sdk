# ChatRequestBy

The provider sorting strategy (price, throughput, latency)

## Example Usage

```typescript
import { ChatRequestBy } from "@openrouter/sdk/models";

let value: ChatRequestBy = "price";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"price" | "throughput" | "latency" | "exacto" | Unrecognized<string>
```