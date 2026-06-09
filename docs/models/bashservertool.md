# BashServerTool

OpenRouter built-in server tool: runs shell commands server-side in a sandboxed container

## Example Usage

```typescript
import { BashServerTool } from "@openrouter/sdk/models";

let value: BashServerTool = {
  type: "openrouter:bash",
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      | Example                                                          |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `parameters`                                                     | [models.BashServerToolConfig](../models/bashservertoolconfig.md) | :heavy_minus_sign:                                               | Configuration for the openrouter:bash server tool                | {<br/>"environment": {<br/>"type": "container_auto"<br/>}<br/>}  |
| `type`                                                           | [models.BashServerToolType](../models/bashservertooltype.md)     | :heavy_check_mark:                                               | N/A                                                              |                                                                  |