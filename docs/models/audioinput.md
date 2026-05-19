# AudioInput

Audio input to accompany the generated video. Only supported by select models (e.g. Seedance 2.0).

## Example Usage

```typescript
import { AudioInput } from "@openrouter/sdk/models";

let value: AudioInput = {
  audioUrl: {
    url: "https://example.com/audio.mp3",
  },
  type: "audio_url",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `audioUrl`                                           | [models.AudioUrl](../models/audiourl.md)             | :heavy_check_mark:                                   | N/A                                                  |
| `type`                                               | [models.AudioInputType](../models/audioinputtype.md) | :heavy_check_mark:                                   | N/A                                                  |