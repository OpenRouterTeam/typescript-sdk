# ChatWebSearchServerTool

OpenRouter built-in server tool: searches the web for current information

## Example Usage

```typescript
import { ChatWebSearchServerTool } from "@openrouter/sdk/models";

let value: ChatWebSearchServerTool = {
  type: "openrouter:web_search",
};
```

## Fields

| Field                                                                                                                | Type                                                                                                                 | Required                                                                                                             | Description                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                               | [models.ChatWebSearchServerToolTypeOpenrouterWebSearch](../models/chatwebsearchservertooltypeopenrouterwebsearch.md) | :heavy_check_mark:                                                                                                   | N/A                                                                                                                  |
| `parameters`                                                                                                         | [models.ChatWebSearchServerToolParameters](../models/chatwebsearchservertoolparameters.md)                           | :heavy_minus_sign:                                                                                                   | N/A                                                                                                                  |