# ChatCompletionChoiceFinishReason

Reason the completion finished

## Example Usage

```typescript
import { ChatCompletionChoiceFinishReason } from "open-router/models";

let value: ChatCompletionChoiceFinishReason = "tool_calls";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"tool_calls" | "stop" | "length" | "content_filter" | "error" | Unrecognized<string>
```