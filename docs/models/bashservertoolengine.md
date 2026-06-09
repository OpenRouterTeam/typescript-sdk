# BashServerToolEngine

Which bash engine to use. "openrouter" runs commands server-side in the OpenRouter sandbox. "auto" (default) and "native" use native passthrough, returning the tool call to your application to run client-side; OpenRouter does not execute the commands.

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