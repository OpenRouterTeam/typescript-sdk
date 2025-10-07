# ResponsesOutputMessage

Output message from assistant

## Example Usage

```typescript
import { ResponsesOutputMessage } from "@openrouter/sdk/models";

let value: ResponsesOutputMessage = {
  type: "message",
  id: "<id>",
  status: "completed",
  role: "assistant",
  content: [
    {
      type: "output_text",
      text: "The weather today is sunny with a high of 75°F.",
      annotations: [],
    },
  ],
};
```

## Fields

| Field                                                                                                       | Type                                                                                                        | Required                                                                                                    | Description                                                                                                 | Example                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                      | [models.ResponsesOutputMessageType](../models/responsesoutputmessagetype.md)                                | :heavy_check_mark:                                                                                          | N/A                                                                                                         |                                                                                                             |
| `id`                                                                                                        | *string*                                                                                                    | :heavy_check_mark:                                                                                          | N/A                                                                                                         |                                                                                                             |
| `status`                                                                                                    | *models.ResponsesMessageStatus*                                                                             | :heavy_check_mark:                                                                                          | N/A                                                                                                         | completed                                                                                                   |
| `role`                                                                                                      | [models.ResponsesOutputMessageRole](../models/responsesoutputmessagerole.md)                                | :heavy_check_mark:                                                                                          | N/A                                                                                                         |                                                                                                             |
| `content`                                                                                                   | *models.ResponsesMessageContent*[]                                                                          | :heavy_check_mark:                                                                                          | N/A                                                                                                         | [<br/>{<br/>"type": "output_text",<br/>"text": "The weather today is sunny with a high of 75°F.",<br/>"annotations": []<br/>}<br/>] |