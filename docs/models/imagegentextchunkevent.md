# ImageGenTextChunkEvent

Emitted when a text chunk becomes available during streaming generation of text-based formats (e.g. SVG)

## Example Usage

```typescript
import { ImageGenTextChunkEvent } from "@openrouter/sdk/models";

let value: ImageGenTextChunkEvent = {
  phase: "content",
  text: "<svg xmlns=\"http://www.w3.org/2000/svg\">",
  type: "image_generation.text_chunk",
};
```

## Fields

| Field                                                                                                                                     | Type                                                                                                                                      | Required                                                                                                                                  | Description                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `phase`                                                                                                                                   | [models.ImageGenTextChunkEventPhase](../models/imagegentextchunkeventphase.md)                                                            | :heavy_check_mark:                                                                                                                        | The generation phase this chunk belongs to. `content` is the renderable output; `reasoning` and `draft` are intermediate provider phases. |
| `text`                                                                                                                                    | *string*                                                                                                                                  | :heavy_check_mark:                                                                                                                        | A text fragment of the image being generated (e.g. partial SVG markup)                                                                    |
| `type`                                                                                                                                    | *"image_generation.text_chunk"*                                                                                                           | :heavy_check_mark:                                                                                                                        | The event type                                                                                                                            |