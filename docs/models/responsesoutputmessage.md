# ResponsesOutputMessage

## Example Usage

```typescript
import { ResponsesOutputMessage } from "@openrouter/sdk/models";

let value: ResponsesOutputMessage = {
  id: "msg-abc123",
  role: "assistant",
  type: "message",
  status: "completed",
  content: [
    {
      type: "output_text",
      text: "Hello! How can I help you today?",
      annotations: [
        {
          type: "file_citation",
          fileId: "file-abc123",
          filename: "research_paper.pdf",
          index: 0,
        },
      ],
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
| `status`                                                                     | *models.Status*                                                              | :heavy_check_mark:                                                           | N/A                                                                          |
| `content`                                                                    | *models.ResponsesOutputMessageContent*[]                                     | :heavy_check_mark:                                                           | N/A                                                                          |