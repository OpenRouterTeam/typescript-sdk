# ChatCompletionNamedToolChoice

Named tool choice for specific function

## Example Usage

```typescript
import { ChatCompletionNamedToolChoice } from "open-router/models";

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
| `type`                                                                                             | [models.ChatCompletionNamedToolChoiceType](../models/chatcompletionnamedtoolchoicetype.md)         | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `function`                                                                                         | [models.ChatCompletionNamedToolChoiceFunction](../models/chatcompletionnamedtoolchoicefunction.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |