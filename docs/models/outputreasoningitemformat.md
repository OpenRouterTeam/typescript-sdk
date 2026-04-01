# OutputReasoningItemFormat

The format of the reasoning content

## Example Usage

```typescript
import { OutputReasoningItemFormat } from "@openrouter/sdk/models";

let value: OutputReasoningItemFormat = "anthropic-claude-v1";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"unknown" | "openai-responses-v1" | "azure-openai-responses-v1" | "xai-responses-v1" | "anthropic-claude-v1" | "google-gemini-v1" | Unrecognized<string>
```