# ChatCompletionAssistantMessageParam

Assistant message with tool calls and audio support

## Example Usage

```typescript
import { ChatCompletionAssistantMessageParam } from "open-router/models";

let value: ChatCompletionAssistantMessageParam = {
  role: "assistant",
};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `role`                                                                                                 | [models.ChatCompletionAssistantMessageParamRole](../models/chatcompletionassistantmessageparamrole.md) | :heavy_check_mark:                                                                                     | N/A                                                                                                    |
| `content`                                                                                              | *models.ChatCompletionAssistantMessageParamContent*                                                    | :heavy_minus_sign:                                                                                     | Assistant message content                                                                              |
| `name`                                                                                                 | *string*                                                                                               | :heavy_minus_sign:                                                                                     | Optional name for the assistant                                                                        |
| `toolCalls`                                                                                            | [models.ChatCompletionMessageToolCall](../models/chatcompletionmessagetoolcall.md)[]                   | :heavy_minus_sign:                                                                                     | Tool calls made by the assistant                                                                       |
| `refusal`                                                                                              | *string*                                                                                               | :heavy_minus_sign:                                                                                     | Refusal message if content was refused                                                                 |