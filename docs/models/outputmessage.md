# OutputMessage

## Example Usage

```typescript
import { OutputMessage } from "@openrouter/sdk/models";

let value: OutputMessage = {
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

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `id`                                                       | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `role`                                                     | [models.OutputMessageRole](../models/outputmessagerole.md) | :heavy_check_mark:                                         | N/A                                                        |
| `type`                                                     | [models.OutputMessageType](../models/outputmessagetype.md) | :heavy_check_mark:                                         | N/A                                                        |
| `status`                                                   | *models.OutputMessageStatusUnion*                          | :heavy_minus_sign:                                         | N/A                                                        |
| `content`                                                  | *models.OutputMessageContent*[]                            | :heavy_check_mark:                                         | N/A                                                        |