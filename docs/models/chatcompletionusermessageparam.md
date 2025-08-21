# ChatCompletionUserMessageParam

User message

## Example Usage

```typescript
import { ChatCompletionUserMessageParam } from "open-router/models";

let value: ChatCompletionUserMessageParam = {
  role: "user",
  content: [],
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `role`                                                                                       | [models.ChatCompletionUserMessageParamRole](../models/chatcompletionusermessageparamrole.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `content`                                                                                    | *models.ChatCompletionUserMessageParamContent*                                               | :heavy_check_mark:                                                                           | User message content                                                                         |
| `name`                                                                                       | *string*                                                                                     | :heavy_minus_sign:                                                                           | Optional name for the user                                                                   |