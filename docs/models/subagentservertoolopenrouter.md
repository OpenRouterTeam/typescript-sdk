# SubagentServerToolOpenRouter

OpenRouter built-in server tool: delegates self-contained tasks to a smaller, cheaper, faster worker model (any OpenRouter model) mid-generation and returns its outcome. The worker may run as a sub-agent with its own tools.

## Example Usage

```typescript
import { SubagentServerToolOpenRouter } from "@openrouter/sdk/models";

let value: SubagentServerToolOpenRouter = {
  type: "openrouter:subagent",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              | Example                                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `parameters`                                                                             | [models.SubagentServerToolConfig](../models/subagentservertoolconfig.md)                 | :heavy_minus_sign:                                                                       | Configuration for the openrouter:subagent server tool.                                   | {<br/>"model": "~anthropic/claude-haiku-latest"<br/>}                                    |
| `type`                                                                                   | [models.SubagentServerToolOpenRouterType](../models/subagentservertoolopenroutertype.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |