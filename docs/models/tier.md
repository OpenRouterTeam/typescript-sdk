# Tier

Optional quality/cost tier (free, standard, premium)

## Example Usage

```typescript
import { Tier } from "@openrouter/sdk/models";

let value: Tier = "standard";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"free" | "standard" | "premium" | Unrecognized<string>
```