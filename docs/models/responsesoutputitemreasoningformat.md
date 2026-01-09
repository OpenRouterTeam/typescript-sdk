# ResponsesOutputItemReasoningFormat

The format of the reasoning content

## Example Usage

```typescript
import { ResponsesOutputItemReasoningFormat } from "@openrouter/sdk/models";

let value: ResponsesOutputItemReasoningFormat = "anthropic-claude-v1";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"unknown" | "openai-responses-v1" | "azure-openai-responses-v1" | "xai-responses-v1" | "anthropic-claude-v1" | "google-gemini-v1" | Unrecognized<string>
```