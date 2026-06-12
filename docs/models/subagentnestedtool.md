# SubagentNestedTool

A tool made available to the subagent. Accepts function tools and OpenRouter server tools (e.g. openrouter:web_search). The subagent tool may not list itself.

## Example Usage

```typescript
import { SubagentNestedTool } from "@openrouter/sdk/models";

let value: SubagentNestedTool = {
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