# ResponseInputAudio

Audio input content item

## Example Usage

```typescript
import { ResponseInputAudio } from "@openrouter/sdk/models";

let value: ResponseInputAudio = {
  type: "input_audio",
  inputAudio: {
    data: "SGVsbG8gV29ybGQ=",
    format: "mp3",
  },
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                                                           | [models.ResponseInputAudioType](../models/responseinputaudiotype.md)             | :heavy_check_mark:                                                               | N/A                                                                              |
| `inputAudio`                                                                     | [models.ResponseInputAudioInputAudio](../models/responseinputaudioinputaudio.md) | :heavy_check_mark:                                                               | N/A                                                                              |