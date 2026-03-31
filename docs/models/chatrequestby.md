# ChatRequestBy

The provider sorting strategy (price, throughput, latency)

## Example Usage

```typescript
import { ChatRequestBy } from "@openrouter/sdk/models";

let value: ChatRequestBy = "price";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"price" | "throughput" | "latency" | "exacto" | Unrecognized<string>
```