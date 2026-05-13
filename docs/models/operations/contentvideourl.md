# ContentVideoURL

## Example Usage

```typescript
import { ContentVideoURL } from "@openrouter/sdk/models/operations";

let value: ContentVideoURL = {
  type: "video_url",
  videoUrl: {
    data: "data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAGlzb21tcDQy...",
  },
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              | Example                                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `type`                                                                                   | *"video_url"*                                                                            | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |
| `videoUrl`                                                                               | [models.MultimodalVideoUrl](../../models/multimodalvideourl.md)                          | :heavy_check_mark:                                                                       | N/A                                                                                      | {<br/>"data": "data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAGlzb21tcDQy...",<br/>"format": "mp4"<br/>} |