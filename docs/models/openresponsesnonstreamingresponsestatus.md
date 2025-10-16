# OpenResponsesNonStreamingResponseStatus

## Example Usage

```typescript
import { OpenResponsesNonStreamingResponseStatus } from "@openrouter/sdk/models";

let value: OpenResponsesNonStreamingResponseStatus = "in_progress";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"completed" | "incomplete" | "in_progress" | "failed" | "cancelled" | "queued" | Unrecognized<string>
```