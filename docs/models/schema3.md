# Schema3

## Example Usage

```typescript
import { Schema3 } from "@openrouter/sdk/models";

let value: Schema3 = "allow";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"deny" | "allow" | Unrecognized<string>
```