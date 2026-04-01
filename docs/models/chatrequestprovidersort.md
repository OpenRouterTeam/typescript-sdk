# ChatRequestProviderSort

The provider sorting strategy (price, throughput, latency)

## Example Usage

```typescript
import { ChatRequestProviderSort } from "@openrouter/sdk/models";

let value: ChatRequestProviderSort = "price";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"price" | "throughput" | "latency" | "exacto" | Unrecognized<string>
```