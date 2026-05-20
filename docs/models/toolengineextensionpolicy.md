# ToolEngineExtensionPolicy

How the engine treats unknown request fields. `strict` rejects them; `meta-only` allows opaque metadata only.

## Example Usage

```typescript
import { ToolEngineExtensionPolicy } from "@openrouter/sdk/models";

let value: ToolEngineExtensionPolicy = "meta-only";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"strict" | "meta-only" | Unrecognized<string>
```