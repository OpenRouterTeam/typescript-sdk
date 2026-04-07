# PromptInjectionMode

Detection mode for prompt injection attempts. Defaults to detect.

## Example Usage

```typescript
import { PromptInjectionMode } from "@openrouter/sdk/models";

let value: PromptInjectionMode = "detect";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"detect" | "block" | Unrecognized<string>
```