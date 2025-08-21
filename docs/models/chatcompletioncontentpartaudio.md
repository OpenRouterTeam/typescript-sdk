# ChatCompletionContentPartAudio

Audio input content part

## Example Usage

```typescript
import { ChatCompletionContentPartAudio } from "open-router/models";

let value: ChatCompletionContentPartAudio = {
  type: "input_audio",
  inputAudio: {
    data: "<value>",
    format: "pcm24",
  },
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `type`                                                                                       | [models.ChatCompletionContentPartAudioType](../models/chatcompletioncontentpartaudiotype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `inputAudio`                                                                                 | [models.InputAudio](../models/inputaudio.md)                                                 | :heavy_check_mark:                                                                           | N/A                                                                                          |