# ChatResponseChoiceFinishReason

## Example Usage

```typescript
import { ChatResponseChoiceFinishReason } from "@openrouter/sdk/models";

let value: ChatResponseChoiceFinishReason = "content_filter";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"tool_calls" | "stop" | "length" | "content_filter" | "error" | Unrecognized<string>
```