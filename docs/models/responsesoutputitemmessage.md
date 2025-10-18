# ResponsesOutputItemMessage

## Example Usage

```typescript
import { ResponsesOutputItemMessage } from "@openrouter/sdk/models";

let value: ResponsesOutputItemMessage = {
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
| `role`                                                                               | [models.ResponsesOutputItemRole](../models/responsesoutputitemrole.md)               | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `type`                                                                               | [models.ResponsesOutputItemTypeMessage](../models/responsesoutputitemtypemessage.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `status`                                                                             | *models.ResponsesOutputItemStatusUnion*                                              | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `content`                                                                            | *models.ResponsesOutputItemContent*[]                                                | :heavy_check_mark:                                                                   | N/A                                                                                  |