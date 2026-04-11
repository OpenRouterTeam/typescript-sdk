# FrameType

Whether this image represents the first or last frame of the video

## Example Usage

```typescript
import { FrameType } from "@openrouter/sdk/models";

let value: FrameType = "first_frame";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"first_frame" | "last_frame" | Unrecognized<string>
```