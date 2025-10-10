# ResponseFunctionCallStatus

## Example Usage

```typescript
import { ResponseFunctionCallStatus } from "@openrouter/sdk/models";

let value: ResponseFunctionCallStatus = "completed";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"in_progress" | "completed" | "incomplete" | Unrecognized<string>
```