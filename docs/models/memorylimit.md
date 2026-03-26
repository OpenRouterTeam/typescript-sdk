# MemoryLimit

## Example Usage

```typescript
import { MemoryLimit } from "@openrouter/sdk/models";

let value: MemoryLimit = "16g";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"1g" | "4g" | "16g" | "64g" | Unrecognized<string>
```