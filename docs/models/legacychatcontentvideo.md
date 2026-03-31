# ~~LegacyChatContentVideo~~

Video input content part (legacy format - deprecated)

> :warning: **DEPRECATED**: This will be removed in a future release, please migrate away from it as soon as possible.

## Example Usage

```typescript
import { LegacyChatContentVideo } from "@openrouter/sdk/models";

let value: LegacyChatContentVideo = {
  type: "input_video",
  videoUrl: {
    url: "https://other-spirit.org/",
  },
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `type`                                                             | *"input_video"*                                                    | :heavy_check_mark:                                                 | N/A                                                                |
| `videoUrl`                                                         | [models.ChatContentVideoInput](../models/chatcontentvideoinput.md) | :heavy_check_mark:                                                 | Video input object                                                 |