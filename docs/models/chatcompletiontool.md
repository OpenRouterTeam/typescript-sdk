# ChatCompletionTool

## Example Usage

```typescript
import { ChatCompletionTool } from "openrouter/models";

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
| `type`                                                                       | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `function`                                                                   | [models.ChatCompletionToolFunction](../models/chatcompletiontoolfunction.md) | :heavy_check_mark:                                                           | N/A                                                                          |