# ChatContentAudio

Audio input content part. Supported audio formats vary by provider.

## Example Usage

```typescript
import { ChatContentAudio } from "@openrouter/sdk/models";

let value: ChatContentAudio = {
  type: "input_audio",
  inputAudio: {
    data: "<value>",
    format: "<value>",
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | *"input_audio"*                                                              | :heavy_check_mark:                                                           | N/A                                                                          |
| `inputAudio`                                                                 | [models.ChatContentAudioInputAudio](../models/chatcontentaudioinputaudio.md) | :heavy_check_mark:                                                           | N/A                                                                          |