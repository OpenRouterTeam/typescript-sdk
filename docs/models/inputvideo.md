# InputVideo

Video input content item

## Example Usage

```typescript
import { InputVideo } from "@openrouter/sdk/models";

let value: InputVideo = {
  type: "input_video",
  videoUrl: "https://example.com/video.mp4",
};
```

## Fields

| Field                                                         | Type                                                          | Required                                                      | Description                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `type`                                                        | *"input_video"*                                               | :heavy_check_mark:                                            | N/A                                                           |
| `videoUrl`                                                    | *string*                                                      | :heavy_check_mark:                                            | A base64 data URL or remote URL that resolves to a video file |