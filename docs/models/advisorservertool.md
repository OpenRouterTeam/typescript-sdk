# AdvisorServerTool

OpenRouter built-in server tool: consults a higher-intelligence advisor model for strategic guidance

## Example Usage

```typescript
import { AdvisorServerTool } from "@openrouter/sdk/models";

let value: AdvisorServerTool = {
  type: "openrouter:advisor",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `parameters`                                                           | [models.AdvisorServerToolConfig](../models/advisorservertoolconfig.md) | :heavy_minus_sign:                                                     | Configuration for the openrouter:advisor server tool                   | {<br/>"max_uses": 3,<br/>"model": "anthropic/claude-opus-4-7"<br/>}    |
| `type`                                                                 | [models.AdvisorServerToolType](../models/advisorservertooltype.md)     | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |