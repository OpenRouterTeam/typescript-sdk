# ChatCompletionFinishReason

## Example Usage

```typescript
import { ChatCompletionFinishReason } from "@openrouter/sdk/models";

let value: ChatCompletionFinishReason = "stop";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"tool_calls" | "stop" | "length" | "content_filter" | "error" | Unrecognized<string>
```