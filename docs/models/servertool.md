# ServerTool

An OpenRouter built-in server tool that models can call during a request

## Example Usage

```typescript
import { ServerTool } from "@openrouter/sdk/models";

let value: ServerTool = {
  description: "Search the web for current information",
  type: "openrouter:web_search",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          | Example                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `description`                                                        | *string*                                                             | :heavy_check_mark:                                                   | Human-readable description of the tool                               | Search the web for current information                               |
| `parametersSchema`                                                   | Record<string, *any*>                                                | :heavy_minus_sign:                                                   | JSON Schema for the optional parameters object accepted by this tool |                                                                      |
| `type`                                                               | *string*                                                             | :heavy_check_mark:                                                   | The tool type identifier used in the tools array of a request        | openrouter:web_search                                                |