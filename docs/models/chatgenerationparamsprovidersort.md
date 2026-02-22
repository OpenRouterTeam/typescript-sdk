# ChatGenerationParamsProviderSort

The provider sorting strategy (price, throughput, latency)

## Example Usage

```typescript
import { ChatGenerationParamsProviderSort } from "@openrouter/sdk/models";

let value: ChatGenerationParamsProviderSort = "price";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"price" | "throughput" | "latency" | Unrecognized<string>
```