# ImageGenerationRequestQuality

Rendering quality. Providers without a quality knob ignore this.

## Example Usage

```typescript
import { ImageGenerationRequestQuality } from "@openrouter/sdk/models";

let value: ImageGenerationRequestQuality = "high";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"auto" | "low" | "medium" | "high" | Unrecognized<string>
```