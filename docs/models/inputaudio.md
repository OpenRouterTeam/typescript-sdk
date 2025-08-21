# InputAudio

## Example Usage

```typescript
import { InputAudio } from "open-router/models";

let value: InputAudio = {
  data: "<value>",
  format: "mp3",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `data`                                                                                           | *string*                                                                                         | :heavy_check_mark:                                                                               | Base64 encoded audio data                                                                        |
| `format`                                                                                         | [models.ChatCompletionContentPartAudioFormat](../models/chatcompletioncontentpartaudioformat.md) | :heavy_check_mark:                                                                               | Audio format                                                                                     |