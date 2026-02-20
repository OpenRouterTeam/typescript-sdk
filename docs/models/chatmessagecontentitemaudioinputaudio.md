# ChatMessageContentItemAudioInputAudio

## Example Usage

```typescript
import { ChatMessageContentItemAudioInputAudio } from "@openrouter/sdk/models";

let value: ChatMessageContentItemAudioInputAudio = {
  data: "<value>",
  format: "<value>",
};
```

## Fields

| Field                                                                                                       | Type                                                                                                        | Required                                                                                                    | Description                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                      | *string*                                                                                                    | :heavy_check_mark:                                                                                          | Base64 encoded audio data                                                                                   |
| `format`                                                                                                    | *string*                                                                                                    | :heavy_check_mark:                                                                                          | Audio format (e.g., wav, mp3, flac, m4a, ogg, aiff, aac, pcm16, pcm24). Supported formats vary by provider. |