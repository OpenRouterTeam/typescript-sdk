# FrameImage

## Example Usage

```typescript
import { FrameImage } from "@openrouter/sdk/models";

let value: FrameImage = {
  imageUrl: {
    url: "https://example.com/image.png",
  },
  type: "image_url",
  frameType: "first_frame",
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        | Example                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `imageUrl`                                                         | [models.FrameImageImageUrl](../models/frameimageimageurl.md)       | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `type`                                                             | [models.FrameImageType](../models/frameimagetype.md)               | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `frameType`                                                        | [models.FrameType](../models/frametype.md)                         | :heavy_check_mark:                                                 | Whether this image represents the first or last frame of the video | first_frame                                                        |