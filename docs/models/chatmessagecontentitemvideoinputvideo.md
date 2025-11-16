# ChatMessageContentItemVideoInputVideo

## Example Usage

```typescript
import { ChatMessageContentItemVideoInputVideo } from "@openrouter/sdk/models";

let value: ChatMessageContentItemVideoInputVideo = {
  type: "input_video",
  videoUrl: {
    url: "https://salty-diversity.biz",
  },
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `type`                                     | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `videoUrl`                                 | [models.VideoUrl1](../models/videourl1.md) | :heavy_check_mark:                         | N/A                                        |