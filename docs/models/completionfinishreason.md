# CompletionFinishReason

## Example Usage

```typescript
import { CompletionFinishReason } from "@openrouter/sdk/models";

let value: CompletionFinishReason = "length";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"stop" | "length" | "content_filter" | Unrecognized<string>
```