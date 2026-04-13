# VideoModelsListResponse

## Example Usage

```typescript
import { VideoModelsListResponse } from "@openrouter/sdk/models";

let value: VideoModelsListResponse = {
  data: [
    {
      allowedPassthroughParameters: [],
      canonicalSlug: "google/veo-3.1",
      created: 1700000000,
      id: "google/veo-3.1",
      name: "Veo 3.1",
      supportedAspectRatios: [
        "16:9",
      ],
      supportedDurations: [
        5,
        8,
      ],
      supportedResolutions: [
        "720p",
      ],
      supportedSizes: null,
    },
  ],
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `data`                                         | [models.VideoModel](../models/videomodel.md)[] | :heavy_check_mark:                             | N/A                                            |