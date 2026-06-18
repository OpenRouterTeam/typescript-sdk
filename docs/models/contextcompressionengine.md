# ContextCompressionEngine

The compression engine to use. Defaults to "middle-out".

## Example Usage

```typescript
import { ContextCompressionEngine } from "@openrouter/sdk/models";

let value: ContextCompressionEngine = "middle-out";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"middle-out" | "headroom" | Unrecognized<string>
```