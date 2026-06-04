# ContentPartVideo

## Example Usage

```typescript
import { ContentPartVideo } from "@openrouter/sdk/models";

let value: ContentPartVideo = {
  type: "video_url",
  videoUrl: {
    url: "https://bleak-marketplace.org/",
  },
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `type`                                   | *"video_url"*                            | :heavy_check_mark:                       | N/A                                      |
| `videoUrl`                               | [models.VideoUrl](../models/videourl.md) | :heavy_check_mark:                       | N/A                                      |