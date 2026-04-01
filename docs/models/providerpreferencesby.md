# ProviderPreferencesBy

The provider sorting strategy (price, throughput, latency)

## Example Usage

```typescript
import { ProviderPreferencesBy } from "@openrouter/sdk/models";

let value: ProviderPreferencesBy = "price";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"price" | "throughput" | "latency" | "exacto" | Unrecognized<string>
```