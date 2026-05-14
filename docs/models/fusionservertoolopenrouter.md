# FusionServerToolOpenRouter

OpenRouter built-in server tool: each panel model independently researches the user prompt with web search and web fetch, then a judge synthesizes their collective output as structured analysis JSON the outer model can use to write the final answer.

## Example Usage

```typescript
import { FusionServerToolOpenRouter } from "@openrouter/sdk/models";

let value: FusionServerToolOpenRouter = {
  type: "openrouter:fusion",
};
```

## Fields

| Field                                                                                                         | Type                                                                                                          | Required                                                                                                      | Description                                                                                                   | Example                                                                                                       |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `parameters`                                                                                                  | [models.FusionServerToolConfig](../models/fusionservertoolconfig.md)                                          | :heavy_minus_sign:                                                                                            | Configuration for the openrouter:fusion server tool.                                                          | {<br/>"analysis_models": [<br/>"~anthropic/claude-opus-latest",<br/>"~openai/gpt-latest",<br/>"~google/gemini-pro-latest"<br/>]<br/>} |
| `type`                                                                                                        | *"openrouter:fusion"*                                                                                         | :heavy_check_mark:                                                                                            | N/A                                                                                                           |                                                                                                               |