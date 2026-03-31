# InputAudio

Audio input content item

## Example Usage

```typescript
import { InputAudio } from "@openrouter/sdk/models";

let value: InputAudio = {
  type: "input_audio",
  inputAudio: {
    data: "SGVsbG8gV29ybGQ=",
    format: "mp3",
  },
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `type`                                                           | *"input_audio"*                                                  | :heavy_check_mark:                                               | N/A                                                              |
| `inputAudio`                                                     | [models.InputAudioInputAudio](../models/inputaudioinputaudio.md) | :heavy_check_mark:                                               | N/A                                                              |