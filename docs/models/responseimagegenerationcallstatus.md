# ResponseImageGenerationCallStatus

## Example Usage

```typescript
import { ResponseImageGenerationCallStatus } from "@openrouter/sdk/models";

let value: ResponseImageGenerationCallStatus = "completed";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"in_progress" | "completed" | "generating" | "failed" | Unrecognized<string>
```