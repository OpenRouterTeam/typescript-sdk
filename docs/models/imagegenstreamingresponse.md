# ImageGenStreamingResponse

SSE streaming response for image generation

## Example Usage

```typescript
import { ImageGenStreamingResponse } from "@openrouter/sdk/models";

let value: ImageGenStreamingResponse = {
  data: {
    b64Json: "iVBORw0KGgo...",
    partialImageIndex: 0,
    type: "image_generation.partial_image",
  },
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `data`                                 | *models.ImageGenStreamingResponseData* | :heavy_check_mark:                     | N/A                                    |