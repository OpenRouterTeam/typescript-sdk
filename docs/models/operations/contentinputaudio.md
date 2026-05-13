# ContentInputAudio

## Example Usage

```typescript
import { ContentInputAudio } from "@openrouter/sdk/models/operations";

let value: ContentInputAudio = {
  inputAudio: {
    data: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAA...",
  },
  type: "input_audio",
};
```

## Fields

| Field                                                                               | Type                                                                                | Required                                                                            | Description                                                                         | Example                                                                             |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `inputAudio`                                                                        | [models.MultimodalInputAudio](../../models/multimodalinputaudio.md)                 | :heavy_check_mark:                                                                  | N/A                                                                                 | {<br/>"data": "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAA...",<br/>"format": "wav"<br/>} |
| `type`                                                                              | *"input_audio"*                                                                     | :heavy_check_mark:                                                                  | N/A                                                                                 |                                                                                     |