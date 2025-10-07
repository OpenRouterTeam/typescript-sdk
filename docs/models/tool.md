# Tool

## Example Usage

```typescript
import { Tool } from "@openrouter/sdk/models";

let value: Tool = {
  type: "function",
  function: {
    name: "<value>",
    description: "mealy ew industrialize colossal",
    parameters: {
      "key": "<value>",
      "key1": "<value>",
      "key2": "<value>",
    },
    strict: false,
  },
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `type`                                           | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `function`                                       | [models.ToolFunction](../models/toolfunction.md) | :heavy_check_mark:                               | N/A                                              |