# ChatCompletionSystemMessageParam

## Example Usage

```typescript
import { ChatCompletionSystemMessageParam } from "open-router/models";

let value: ChatCompletionSystemMessageParam = {
  role: "system",
  content: [
    {
      type: "text",
      text: "<value>",
    },
  ],
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `role`                                           | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `content`                                        | *models.ChatCompletionSystemMessageParamContent* | :heavy_check_mark:                               | N/A                                              |
| `name`                                           | *string*                                         | :heavy_minus_sign:                               | N/A                                              |