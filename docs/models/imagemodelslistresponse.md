# ImageModelsListResponse

List of image generation models.

## Example Usage

```typescript
import { ImageModelsListResponse } from "@openrouter/sdk/models";

let value: ImageModelsListResponse = {
  data: [
    {
      architecture: {
        inputModalities: [
          "text",
        ],
        outputModalities: [
          "image",
        ],
      },
      created: 1692901234,
      description: "A text-to-image model.",
      endpoints: "/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints",
      id: "bytedance-seed/seedream-4.5",
      name: "Seedream 4.5",
      supportedParameters: {
        "resolution": {
          type: "enum",
          values: [
            "1K",
            "2K",
            "4K",
          ],
        },
      },
      supportsStreaming: false,
    },
  ],
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `data`                                                         | [models.ImageModelListItem](../models/imagemodellistitem.md)[] | :heavy_check_mark:                                             | N/A                                                            |