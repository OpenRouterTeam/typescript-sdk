# OpenAIResponseInputMessageItem

## Example Usage

```typescript
import { OpenAIResponseInputMessageItem } from "@openrouter/sdk/models";

let value: OpenAIResponseInputMessageItem = {
  id: "msg-abc123",
  role: "user",
  content: [
    {
      type: "input_text",
      text: "Hello, how are you?",
    },
  ],
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `id`                                                                                         | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `type`                                                                                       | [models.OpenAIResponseInputMessageItemType](../models/openairesponseinputmessageitemtype.md) | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `role`                                                                                       | *models.OpenAIResponseInputMessageItemRoleUnion*                                             | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `content`                                                                                    | *models.OpenAIResponseInputMessageItemContent*[]                                             | :heavy_check_mark:                                                                           | N/A                                                                                          |