# AsyncJobStatusResponseStatus

Current status of the async job

## Example Usage

```typescript
import { AsyncJobStatusResponseStatus } from "@openrouter/sdk/models";

let value: AsyncJobStatusResponseStatus = "in_progress";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"pending" | "in_progress" | "completed" | "failed" | "cancelled" | "expired" | Unrecognized<string>
```