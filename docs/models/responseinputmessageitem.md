# ResponseInputMessageItem

Structured input message item

## Example Usage

```typescript
import { ResponseInputMessageItem } from "@openrouter/sdk/models";

let value: ResponseInputMessageItem = {
  id: "<id>",
  type: "message",
  role: "user",
  content: [
    {
      type: "input_image",
      detail: "auto",
      imageUrl: "https://babyish-validity.info",
    },
  ],
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `id`                                                                             | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `type`                                                                           | [models.ResponseInputMessageItemType](../models/responseinputmessageitemtype.md) | :heavy_minus_sign:                                                               | N/A                                                                              |                                                                                  |
| `role`                                                                           | *models.ResponseInputMessageItemRole*                                            | :heavy_check_mark:                                                               | N/A                                                                              | user                                                                             |
| `content`                                                                        | *models.ResponseInputContent*[]                                                  | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |