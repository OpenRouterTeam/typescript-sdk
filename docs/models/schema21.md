# Schema21

## Example Usage

```typescript
import { Schema21 } from "@openrouter/sdk/models";

let value: Schema21 = "openai-responses-v1";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"unknown" | "openai-responses-v1" | "azure-openai-responses-v1" | "xai-responses-v1" | "anthropic-claude-v1" | "google-gemini-v1" | Unrecognized<string>
```