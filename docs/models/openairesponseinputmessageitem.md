# OpenAIResponseInputMessageItem

## Example Usage

```typescript
import { OpenAIResponseInputMessageItem } from "@openrouter/sdk/models";

let value: OpenAIResponseInputMessageItem = {
  content: [
    {
      text: "Hello, how are you?",
      type: "input_text",
    },
  ],
  id: "msg-abc123",
  role: "user",
  type: "message",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `content`                                                                                    | *models.OpenAIResponseInputMessageItemContent*[]                                             | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `id`                                                                                         | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `role`                                                                                       | *models.OpenAIResponseInputMessageItemRoleUnion*                                             | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `type`                                                                                       | [models.OpenAIResponseInputMessageItemType](../models/openairesponseinputmessageitemtype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |