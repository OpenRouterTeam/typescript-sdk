# ChatStreamingChoiceFinishReason

## Example Usage

```typescript
import { ChatStreamingChoiceFinishReason } from "@openrouter/sdk/models";

let value: ChatStreamingChoiceFinishReason = "tool_calls";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"tool_calls" | "stop" | "length" | "content_filter" | "error" | Unrecognized<string>
```