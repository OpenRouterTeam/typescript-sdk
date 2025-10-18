# OpenResponsesInputItemMessage

## Example Usage

```typescript
import { OpenResponsesInputItemMessage } from "@openrouter/sdk/models";

let value: OpenResponsesInputItemMessage = {
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

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `role`                                                                                     | [models.OpenResponsesInputItemRole](../models/openresponsesinputitemrole.md)               | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `type`                                                                                     | [models.OpenResponsesInputItemTypeMessage](../models/openresponsesinputitemtypemessage.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `status`                                                                                   | *models.OpenResponsesInputItemStatusUnion*                                                 | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `content`                                                                                  | *models.OpenResponsesInputItemContent*[]                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |