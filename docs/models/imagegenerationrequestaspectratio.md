# ImageGenerationRequestAspectRatio

Normalized aspect ratio of the generated image. Providers clamp to their supported subset.

## Example Usage

```typescript
import { ImageGenerationRequestAspectRatio } from "@openrouter/sdk/models";

let value: ImageGenerationRequestAspectRatio = "16:9";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"1:1" | "1:2" | "1:4" | "1:8" | "2:1" | "2:3" | "3:2" | "3:4" | "4:1" | "4:3" | "4:5" | "5:4" | "8:1" | "9:16" | "16:9" | "9:19.5" | "19.5:9" | "9:20" | "20:9" | "9:21" | "21:9" | "auto" | Unrecognized<string>
```