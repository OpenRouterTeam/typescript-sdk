# AudioOutputConfig

Configuration for audio output. Required when `modalities` includes `"audio"`.

## Example Usage

```typescript
import { AudioOutputConfig } from "@openrouter/sdk/models";

let value: AudioOutputConfig = {
  format: "mp3",
  voice: "alloy",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `format`                                                   | [models.AudioOutputFormat](../models/audiooutputformat.md) | :heavy_check_mark:                                         | Format of the audio output bytes.                          | mp3                                                        |
| `voice`                                                    | [models.AudioOutputVoice](../models/audiooutputvoice.md)   | :heavy_check_mark:                                         | Voice used for audio output.                               | alloy                                                      |