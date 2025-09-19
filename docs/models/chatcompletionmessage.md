# ChatCompletionMessage

## Example Usage

```typescript
import { ChatCompletionMessage } from "open-router/models";

let value: ChatCompletionMessage = {
  role: "assistant",
  content: "<value>",
  refusal: "<value>",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `role`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `content`                                                                            | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `reasoning`                                                                          | *string*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `refusal`                                                                            | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `toolCalls`                                                                          | [models.ChatCompletionMessageToolCall](../models/chatcompletionmessagetoolcall.md)[] | :heavy_minus_sign:                                                                   | N/A                                                                                  |