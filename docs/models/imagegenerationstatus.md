# ImageGenerationStatus

## Example Usage

```typescript
import { ImageGenerationStatus } from "@openrouter/sdk/models";

let value: ImageGenerationStatus = "failed";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"in_progress" | "completed" | "generating" | "failed" | Unrecognized<string>
```