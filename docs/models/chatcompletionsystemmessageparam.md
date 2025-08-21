# ChatCompletionSystemMessageParam

System message for setting behavior

## Example Usage

```typescript
import { ChatCompletionSystemMessageParam } from "open-router/models";

let value: ChatCompletionSystemMessageParam = {
  role: "system",
  content: [
    {
      type: "text",
      text: "<value>",
    },
  ],
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `role`                                                                                           | [models.ChatCompletionSystemMessageParamRole](../models/chatcompletionsystemmessageparamrole.md) | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `content`                                                                                        | *models.ChatCompletionSystemMessageParamContent*                                                 | :heavy_check_mark:                                                                               | System message content                                                                           |
| `name`                                                                                           | *string*                                                                                         | :heavy_minus_sign:                                                                               | Optional name for the system message                                                             |