# AudioInput

Audio input to accompany the generated video. Only supported by select models (e.g. Seedance 2.0).

## Example Usage

```typescript
import { AudioInput } from "@openrouter/sdk/models";

let value: AudioInput = {
  inputAudio: {
    data: "https://example.com/audio.mp3",
    format: "mp3",
  },
  type: "input_audio",
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `inputAudio`                                                     | [models.AudioInputInputAudio](../models/audioinputinputaudio.md) | :heavy_check_mark:                                               | N/A                                                              |
| `type`                                                           | [models.AudioInputType](../models/audioinputtype.md)             | :heavy_check_mark:                                               | N/A                                                              |