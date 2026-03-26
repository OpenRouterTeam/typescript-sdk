# ChatMessageContentItemAudio

Audio input content part. Supported audio formats vary by provider.

## Example Usage

```typescript
import { ChatMessageContentItemAudio } from "@openrouter/sdk/models";

let value: ChatMessageContentItemAudio = {
  type: "input_audio",
  inputAudio: {
    data: "<value>",
    format: "<value>",
  },
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `type`                                                                                             | [models.ChatMessageContentItemAudioType](../models/chatmessagecontentitemaudiotype.md)             | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `inputAudio`                                                                                       | [models.ChatMessageContentItemAudioInputAudio](../models/chatmessagecontentitemaudioinputaudio.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |