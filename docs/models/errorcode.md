# ErrorCode

## Example Usage

```typescript
import { ErrorCode } from "@openrouter/sdk/models";

let value: ErrorCode = "too_many_requests";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"invalid_tool_input" | "unavailable" | "max_uses_exceeded" | "too_many_requests" | "query_too_long" | Unrecognized<string>
```