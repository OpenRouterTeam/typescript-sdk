# MessagesMessageParam

Anthropic message with OpenRouter extensions

## Example Usage

```typescript
import { MessagesMessageParam } from "@openrouter/sdk/models";

let value: MessagesMessageParam = {
  content: "Hello, how are you?",
  role: "user",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `content`                                                                | *models.MessagesMessageParamContentUnion5*                               | :heavy_check_mark:                                                       | N/A                                                                      |
| `role`                                                                   | [models.MessagesMessageParamRole](../models/messagesmessageparamrole.md) | :heavy_check_mark:                                                       | N/A                                                                      |