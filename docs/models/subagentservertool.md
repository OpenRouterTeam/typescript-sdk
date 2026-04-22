# SubagentServerTool

OpenRouter built-in server tool: delegates a task to another AI model via OpenRouter

## Example Usage

```typescript
import { SubagentServerTool } from "@openrouter/sdk/models";

let value: SubagentServerTool = {
  type: "openrouter:subagent",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `parameters`                                                             | [models.SubagentServerToolConfig](../models/subagentservertoolconfig.md) | :heavy_minus_sign:                                                       | Configuration for the openrouter:subagent server tool                    | {<br/>"max_tokens": 4096,<br/>"model": "openai/gpt-4o-mini"<br/>}        |
| `type`                                                                   | [models.SubagentServerToolType](../models/subagentservertooltype.md)     | :heavy_check_mark:                                                       | N/A                                                                      |                                                                          |