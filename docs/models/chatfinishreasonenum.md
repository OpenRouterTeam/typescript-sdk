# ChatFinishReasonEnum

## Example Usage

```typescript
import { ChatFinishReasonEnum } from "@openrouter/sdk/models";

let value: ChatFinishReasonEnum = "stop";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"tool_calls" | "stop" | "length" | "content_filter" | "error" | Unrecognized<string>
```