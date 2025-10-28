# OpenAIResponsesInputMessage2

## Example Usage

```typescript
import { OpenAIResponsesInputMessage2 } from "@openrouter/sdk/models";

let value: OpenAIResponsesInputMessage2 = {
  id: "<id>",
  type: "message",
  role: "user",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `id`                                                                                     | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `type`                                                                                   | [models.OpenAIResponsesInputTypeMessage2](../models/openairesponsesinputtypemessage2.md) | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `role`                                                                                   | *models.OpenAIResponsesInputRoleUnion2*                                                  | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `content`                                                                                | *models.OpenAIResponsesInputContent3*[]                                                  | :heavy_check_mark:                                                                       | N/A                                                                                      |