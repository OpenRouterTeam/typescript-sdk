# AdvisorNestedTool

A tool made available to the advisor sub-agent. Accepts function tools and OpenRouter server tools (e.g. openrouter:web_search). The advisor tool may not list itself.

## Example Usage

```typescript
import { AdvisorNestedTool } from "@openrouter/sdk/models";

let value: AdvisorNestedTool = {
  type: "openrouter:web_search",
};
```

## Fields

| Field                               | Type                                | Required                            | Description                         | Example                             |
| ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| `function`                          | Record<string, *any*>               | :heavy_minus_sign:                  | N/A                                 |                                     |
| `parameters`                        | Record<string, *any*>               | :heavy_minus_sign:                  | N/A                                 |                                     |
| `type`                              | *string*                            | :heavy_check_mark:                  | N/A                                 |                                     |
| `additionalProperties`              | Record<string, *any*>               | :heavy_minus_sign:                  | N/A                                 | {<br/>"type": "openrouter:web_search"<br/>} |