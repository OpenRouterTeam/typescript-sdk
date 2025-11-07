# ChatMessageContentItemVideo

## Example Usage

```typescript
import { ChatMessageContentItemVideo } from "@openrouter/sdk/models";

let value: ChatMessageContentItemVideo = {
  type: "input_video",
  videoUrl: {
    url: "https://imaginative-mousse.org",
  },
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `type`                                   | *string*                                 | :heavy_check_mark:                       | N/A                                      |
| `videoUrl`                               | [models.VideoUrl](../models/videourl.md) | :heavy_check_mark:                       | N/A                                      |