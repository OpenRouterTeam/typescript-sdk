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

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `type`                                       | *string*                                     | :heavy_check_mark:                           | N/A                                          |
| `inputAudio`                                 | [models.InputAudio](../models/inputaudio.md) | :heavy_check_mark:                           | N/A                                          |