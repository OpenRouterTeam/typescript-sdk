# DeepResearchServerTool

OpenRouter built-in server tool: performs iterative, multi-step web research on a topic with citations

## Example Usage

```typescript
import { DeepResearchServerTool } from "@openrouter/sdk/models";

let value: DeepResearchServerTool = {
  type: "openrouter:deep_research",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `parameters`                                                                     | [models.DeepResearchServerToolConfig](../models/deepresearchservertoolconfig.md) | :heavy_minus_sign:                                                               | Configuration for the openrouter:deep_research server tool.                      | {<br/>"max_iterations": 10,<br/>"model": "~openai/gpt-latest"<br/>}              |
| `type`                                                                           | *"openrouter:deep_research"*                                                     | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |