# ChatMessageContentItemVideo

Video input content part

## Example Usage

```typescript
import { ChatMessageContentItemVideo } from "@openrouter/sdk/models";

let value: ChatMessageContentItemVideo = {
  type: "video_url",
  videoUrl: {
    url: "https://standard-step.net/",
  },
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `type`                                       | *"video_url"*                                | :heavy_check_mark:                           | N/A                                          |
| `videoUrl`                                   | [models.VideoInput](../models/videoinput.md) | :heavy_check_mark:                           | Video input object                           |