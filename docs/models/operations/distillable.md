# Distillable

Filter by distillation capability. "true" returns only distillable models, "false" excludes them.

## Example Usage

```typescript
import { Distillable } from "@openrouter/sdk/models/operations";

let value: Distillable = "true";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"true" | "false" | Unrecognized<string>
```