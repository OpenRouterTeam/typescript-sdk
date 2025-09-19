# ChatCompletionMessageToolCall

## Example Usage

```typescript
import { ChatCompletionMessageToolCall } from "open-router/models";

let value: ChatCompletionMessageToolCall = {
  id: "<id>",
  type: "function",
  function: {
    name: "<value>",
    arguments: "<value>",
  },
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `id`                                                                                               | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `type`                                                                                             | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `function`                                                                                         | [models.ChatCompletionMessageToolCallFunction](../models/chatcompletionmessagetoolcallfunction.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |