# ImageGenerationRequestResolution

Normalized resolution tier of the generated image. Concrete pixel dimensions are derived per-provider.

## Example Usage

```typescript
import { ImageGenerationRequestResolution } from "@openrouter/sdk/models";

let value: ImageGenerationRequestResolution = "2K";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"512" | "1K" | "2K" | "4K" | Unrecognized<string>
```