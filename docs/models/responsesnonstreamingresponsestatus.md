# ResponsesNonStreamingResponseStatus

## Example Usage

```typescript
import { ResponsesNonStreamingResponseStatus } from "@openrouter/sdk/models";

let value: ResponsesNonStreamingResponseStatus = "queued";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"completed" | "incomplete" | "in_progress" | "failed" | "cancelled" | "queued" | Unrecognized<string>
```