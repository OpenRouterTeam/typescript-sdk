# ContentInputVideo

## Example Usage

```typescript
import { ContentInputVideo } from "@openrouter/sdk/models/operations";

let value: ContentInputVideo = {
  inputVideo: {
    data: "data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAGlzb21tcDQy...",
  },
  type: "input_video",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              | Example                                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `inputVideo`                                                                             | [models.MultimodalInputVideo](../../models/multimodalinputvideo.md)                      | :heavy_check_mark:                                                                       | N/A                                                                                      | {<br/>"data": "data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAGlzb21tcDQy...",<br/>"format": "mp4"<br/>} |
| `type`                                                                                   | *"input_video"*                                                                          | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |