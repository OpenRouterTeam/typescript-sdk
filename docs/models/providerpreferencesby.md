# ProviderPreferencesBy

The provider sorting strategy (price, throughput, latency)

## Example Usage

```typescript
import { ProviderPreferencesBy } from "@openrouter/sdk/models";

let value: ProviderPreferencesBy = "price";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"price" | "throughput" | "latency" | Unrecognized<string>
```