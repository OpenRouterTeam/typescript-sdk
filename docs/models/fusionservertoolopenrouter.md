# FusionServerToolOpenRouter

OpenRouter built-in server tool: fans out the user prompt to a panel of analysis models, then asks a judge model to summarize their collective output as structured JSON the outer model can synthesize from.

## Example Usage

```typescript
import { FusionServerToolOpenRouter } from "@openrouter/sdk/models";

let value: FusionServerToolOpenRouter = {
  type: "openrouter:fusion",
};
```

## Fields

| Field                                                                                                          | Type                                                                                                           | Required                                                                                                       | Description                                                                                                    | Example                                                                                                        |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `parameters`                                                                                                   | [models.FusionServerToolConfig](../models/fusionservertoolconfig.md)                                           | :heavy_minus_sign:                                                                                             | Configuration for the openrouter:fusion server tool.                                                           | {<br/>"analysis_models": [<br/>"~anthropic/claude-fable-latest",<br/>"~openai/gpt-latest",<br/>"~google/gemini-pro-latest"<br/>]<br/>} |
| `type`                                                                                                         | *"openrouter:fusion"*                                                                                          | :heavy_check_mark:                                                                                             | N/A                                                                                                            |                                                                                                                |