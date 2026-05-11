# DeepResearchServerTool

OpenRouter built-in server tool: runs multi-step web research by fanning out web search + fetch in parallel across the primary query and optional sub-queries.

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
| `parameters`                                                                     | [models.DeepResearchServerToolConfig](../models/deepresearchservertoolconfig.md) | :heavy_minus_sign:                                                               | Configuration for the openrouter:deep_research server tool                       | {<br/>"max_fetches": 8,<br/>"max_results_per_query": 5,<br/>"max_sub_queries": 5<br/>} |
| `type`                                                                           | [models.DeepResearchServerToolType](../models/deepresearchservertooltype.md)     | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |