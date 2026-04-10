# ChatContentVideo

Video input content part

## Example Usage

```typescript
import { ChatContentVideo } from "@openrouter/sdk/models";

let value: ChatContentVideo = {
  type: "video_url",
  videoUrl: {
    url: "https://example.com/video.mp4",
  },
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        | Example                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `type`                                                             | *"video_url"*                                                      | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `videoUrl`                                                         | [models.ChatContentVideoInput](../models/chatcontentvideoinput.md) | :heavy_check_mark:                                                 | Video input object                                                 | {<br/>"url": "https://example.com/video.mp4"<br/>}                 |