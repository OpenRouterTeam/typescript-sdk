# ChatCompletionToolMessageParam

Tool response message

## Example Usage

```typescript
import { ChatCompletionToolMessageParam } from "open-router/models";

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

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `role`                                                                                       | [models.ChatCompletionToolMessageParamRole](../models/chatcompletiontoolmessageparamrole.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `content`                                                                                    | *models.ChatCompletionToolMessageParamContent*                                               | :heavy_check_mark:                                                                           | Tool response content                                                                        |
| `toolCallId`                                                                                 | *string*                                                                                     | :heavy_check_mark:                                                                           | ID of the tool call this message responds to                                                 |