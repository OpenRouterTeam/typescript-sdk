# Kind

Whether this price is per-token ('token') or per-unit ('unit', e.g. per image, per second)

## Example Usage

```typescript
import { Kind } from "@openrouter/sdk/models";

let value: Kind = "token";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"token" | "unit" | Unrecognized<string>
```