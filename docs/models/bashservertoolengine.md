# BashServerToolEngine

Which bash engine to use. "auto" (default) uses native passthrough when the endpoint advertises native bash support, otherwise the OpenRouter sandbox. "native" forces native passthrough — when the endpoint does not support native, the request falls back to the OpenRouter sandbox. "openrouter" always runs commands in the OpenRouter sandbox.

## Example Usage

```typescript
import { BashServerToolEngine } from "@openrouter/sdk/models";

let value: BashServerToolEngine = "auto";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"auto" | "native" | "openrouter" | Unrecognized<string>
```