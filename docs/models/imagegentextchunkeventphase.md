# ImageGenTextChunkEventPhase

The generation phase this chunk belongs to. `content` is the renderable output; `reasoning` and `draft` are intermediate provider phases.

## Example Usage

```typescript
import { ImageGenTextChunkEventPhase } from "@openrouter/sdk/models";

let value: ImageGenTextChunkEventPhase = "content";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"content" | "reasoning" | "draft" | Unrecognized<string>
```