# Ttl

## Example Usage

```typescript
import { Ttl } from "@openrouter/sdk/models";

let value: Ttl = "5m";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"5m" | "1h" | Unrecognized<string>
```