# ValueType

Whether the operator expects a single value or an array

## Example Usage

```typescript
import { ValueType } from "@openrouter/sdk/models/operations";

let value: ValueType = "scalar";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"scalar" | "array" | Unrecognized<string>
```