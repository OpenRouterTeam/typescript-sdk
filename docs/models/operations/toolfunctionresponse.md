# ToolFunctionResponse

## Example Usage

```typescript
import { ToolFunctionResponse } from "@openrouter/sdk/models/operations";

let value: ToolFunctionResponse = {
  type: "function",
  name: "<value>",
  parameters: {
    "key": "<value>",
    "key1": "<value>",
  },
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `type`                                                                                     | [operations.ToolTypeFunctionResponse](../../models/operations/tooltypefunctionresponse.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `name`                                                                                     | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `description`                                                                              | *string*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `strict`                                                                                   | *boolean*                                                                                  | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `parameters`                                                                               | Record<string, *any*>                                                                      | :heavy_check_mark:                                                                         | N/A                                                                                        |