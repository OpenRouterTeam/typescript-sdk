# ~~ChatMessageContentItemVideoLegacy~~

Video input content part (legacy format - deprecated)

> :warning: **DEPRECATED**: This will be removed in a future release, please migrate away from it as soon as possible.

## Example Usage

```typescript
import { ChatMessageContentItemVideoLegacy } from "@openrouter/sdk/models";

let value: ChatMessageContentItemVideoLegacy = {
  type: "input_video",
  videoUrl: {
    url: "https://standard-step.net/",
  },
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `type`                                       | *"input_video"*                              | :heavy_check_mark:                           | N/A                                          |
| `videoUrl`                                   | [models.VideoInput](../models/videoinput.md) | :heavy_check_mark:                           | Video input object                           |