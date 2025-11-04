# ResponsesOutputMessage

An output message item

## Example Usage

```typescript
import { ResponsesOutputMessage } from "@openrouter/sdk/models";

let value: ResponsesOutputMessage = {
  id: "msg-abc123",
  role: "assistant",
  type: "message",
  content: [
    {
      type: "output_text",
      text: "Hello! How can I help you today?",
    },
  ],
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `id`                                                                         | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `role`                                                                       | [models.ResponsesOutputMessageRole](../models/responsesoutputmessagerole.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `type`                                                                       | [models.ResponsesOutputMessageType](../models/responsesoutputmessagetype.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `status`                                                                     | *models.ResponsesOutputMessageStatusUnion*                                   | :heavy_minus_sign:                                                           | N/A                                                                          |
| `content`                                                                    | *models.ResponsesOutputMessageContent*[]                                     | :heavy_check_mark:                                                           | N/A                                                                          |