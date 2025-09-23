# ChatCompletionToolMessageParam

## Example Usage

```typescript
import { ChatCompletionToolMessageParam } from "openrouter/models";

let value: ChatCompletionToolMessageParam = {
  role: "tool",
  content: [
    {
      type: "input_audio",
      inputAudio: {
        data: "<value>",
        format: "pcm24",
      },
    },
  ],
  toolCallId: "<id>",
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `role`                                         | *string*                                       | :heavy_check_mark:                             | N/A                                            |
| `content`                                      | *models.ChatCompletionToolMessageParamContent* | :heavy_check_mark:                             | N/A                                            |
| `toolCallId`                                   | *string*                                       | :heavy_check_mark:                             | N/A                                            |