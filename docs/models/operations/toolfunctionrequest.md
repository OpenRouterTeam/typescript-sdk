# ToolFunctionRequest

## Example Usage

```typescript
import { ToolFunctionRequest } from "@openrouter/sdk/models/operations";

let value: ToolFunctionRequest = {
  type: "function",
  name: "<value>",
  parameters: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `type`                                                                                   | [operations.ToolTypeFunctionRequest](../../models/operations/tooltypefunctionrequest.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `name`                                                                                   | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `description`                                                                            | *string*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `strict`                                                                                 | *boolean*                                                                                | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `parameters`                                                                             | Record<string, *any*>                                                                    | :heavy_check_mark:                                                                       | N/A                                                                                      |