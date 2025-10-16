# OpenResponsesInputMessageItem

Input message item with structured content array

## Example Usage

```typescript
import { OpenResponsesInputMessageItem } from "@openrouter/sdk/models";

let value: OpenResponsesInputMessageItem = {
  id: "<id>",
  type: "message",
  role: "user",
  content: [
    {
      type: "input_file",
      fileId: "<id>",
      fileData: "<value>",
      filename: "example.file",
      fileUrl: "https://messy-institute.net",
    },
  ],
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `type`                                                                                     | [models.OpenResponsesInputMessageItemType](../models/openresponsesinputmessageitemtype.md) | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `role`                                                                                     | *models.OpenResponsesInputMessageItemRoleUnion*                                            | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `content`                                                                                  | *models.OpenResponsesInputContent*[]                                                       | :heavy_check_mark:                                                                         | N/A                                                                                        |