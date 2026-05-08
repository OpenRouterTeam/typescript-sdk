# FunctionCallOutputItem

The output from a function call execution

## Example Usage

```typescript
import { FunctionCallOutputItem } from "@openrouter/sdk/models";

let value: FunctionCallOutputItem = {
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
  type: "function_call_output",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `callId`                                                                         | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `id`                                                                             | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |                                                                                  |
| `output`                                                                         | *models.FunctionCallOutputItemOutput*                                            | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `status`                                                                         | [models.FunctionCallOutputItemStatus](../models/functioncalloutputitemstatus.md) | :heavy_minus_sign:                                                               | N/A                                                                              | completed                                                                        |
| `type`                                                                           | [models.FunctionCallOutputItemType](../models/functioncalloutputitemtype.md)     | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |