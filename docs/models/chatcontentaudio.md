# ChatContentAudio

Audio input content part. Supported audio formats vary by provider.

## Example Usage

```typescript
import { ChatContentAudio } from "@openrouter/sdk/models";

let value: ChatContentAudio = {
  inputAudio: {
    data: "<value>",
    format: "<value>",
  },
  type: "input_audio",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `inputAudio`                                                                 | [models.ChatContentAudioInputAudio](../models/chatcontentaudioinputaudio.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `type`                                                                       | *"input_audio"*                                                              | :heavy_check_mark:                                                           | N/A                                                                          |