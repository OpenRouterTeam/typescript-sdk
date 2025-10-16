# OpenResponsesInputItemMessage

## Example Usage

```typescript
import { OpenResponsesInputItemMessage } from "@openrouter/sdk/models";

let value: OpenResponsesInputItemMessage = {
  id: "<id>",
  role: "assistant",
  type: "message",
  status: "incomplete",
  content: [
    {
      type: "output_text",
      text: "<value>",
      annotations: [
        {
          type: "url_citation",
          endIndex: 3228.16,
          startIndex: 417.8,
          title: "<value>",
          url: "https://unkempt-equal.com/",
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