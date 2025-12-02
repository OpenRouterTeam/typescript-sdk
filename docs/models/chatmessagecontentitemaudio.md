# ChatMessageContentItemAudio

## Example Usage

```typescript
import { ChatMessageContentItemAudio } from "@openrouter/sdk/models";

let value: ChatMessageContentItemAudio = {
  type: "input_audio",
  inputAudio: {
    data: "<value>",
    format: "pcm24",
  },
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `type`                                                                                             | *"input_audio"*                                                                                    | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `inputAudio`                                                                                       | [models.ChatMessageContentItemAudioInputAudio](../models/chatmessagecontentitemaudioinputaudio.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |