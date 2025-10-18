# OpenResponsesOutputMessage

An output message item

## Example Usage

```typescript
import { OpenResponsesOutputMessage } from "@openrouter/sdk/models";

let value: OpenResponsesOutputMessage = {
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

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `id`                                                                                 | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `role`                                                                               | [models.OpenResponsesOutputMessageRole](../models/openresponsesoutputmessagerole.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `type`                                                                               | [models.OpenResponsesOutputMessageType](../models/openresponsesoutputmessagetype.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `status`                                                                             | *models.OpenResponsesOutputMessageStatusUnion*                                       | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `content`                                                                            | *models.OpenResponsesOutputMessageContent*[]                                         | :heavy_check_mark:                                                                   | N/A                                                                                  |