# ResponsesWebSearchServerTool

OpenRouter built-in server tool: searches the web for current information

## Example Usage

```typescript
import { ResponsesWebSearchServerTool } from "@openrouter/sdk/models";

let value: ResponsesWebSearchServerTool = {
  type: "openrouter:web_search",
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `type`                                                                                               | *"openrouter:web_search"*                                                                            | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `parameters`                                                                                         | [models.ResponsesWebSearchServerToolParameters](../models/responseswebsearchservertoolparameters.md) | :heavy_minus_sign:                                                                                   | N/A                                                                                                  |