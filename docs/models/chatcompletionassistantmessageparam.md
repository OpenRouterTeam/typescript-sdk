# ChatCompletionAssistantMessageParam

## Example Usage

```typescript
import { ChatCompletionAssistantMessageParam } from "openrouter/models";

let value: ChatCompletionAssistantMessageParam = {
  role: "assistant",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `role`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `content`                                                                            | *models.ChatCompletionAssistantMessageParamContent*                                  | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `name`                                                                               | *string*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `toolCalls`                                                                          | [models.ChatCompletionMessageToolCall](../models/chatcompletionmessagetoolcall.md)[] | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `refusal`                                                                            | *string*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |