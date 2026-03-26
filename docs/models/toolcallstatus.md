# ToolCallStatus

## Example Usage

```typescript
import { ToolCallStatus } from "@openrouter/sdk/models";

let value: ToolCallStatus = "completed";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"in_progress" | "completed" | "incomplete" | Unrecognized<string>
```