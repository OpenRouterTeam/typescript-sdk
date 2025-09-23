# ChatCompletionNamedToolChoice

## Example Usage

```typescript
import { ChatCompletionNamedToolChoice } from "openrouter/models";

let value: ChatCompletionNamedToolChoice = {
  type: "function",
  function: {
    name: "<value>",
  },
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `type`                                                                                             | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `function`                                                                                         | [models.ChatCompletionNamedToolChoiceFunction](../models/chatcompletionnamedtoolchoicefunction.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |