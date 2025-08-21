# ChatCompletionTool

Tool definition for function calling

## Example Usage

```typescript
import { ChatCompletionTool } from "open-router/models";

let value: ChatCompletionTool = {
  type: "function",
  function: {
    name: "<value>",
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | [models.ChatCompletionToolType](../models/chatcompletiontooltype.md)         | :heavy_check_mark:                                                           | N/A                                                                          |
| `function`                                                                   | [models.ChatCompletionToolFunction](../models/chatcompletiontoolfunction.md) | :heavy_check_mark:                                                           | Function definition for tool calling                                         |