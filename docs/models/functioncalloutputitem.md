# FunctionCallOutputItem

The output from a function call execution

## Example Usage

```typescript
import { FunctionCallOutputItem } from "@openrouter/sdk/models";

let value: FunctionCallOutputItem = {
  type: "function_call_output",
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
};
```

## Fields

| Field                                                                                                            | Type                                                                                                             | Required                                                                                                         | Description                                                                                                      | Example                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                           | [models.FunctionCallOutputItemTypeFunctionCallOutput](../models/functioncalloutputitemtypefunctioncalloutput.md) | :heavy_check_mark:                                                                                               | N/A                                                                                                              |                                                                                                                  |
| `id`                                                                                                             | *string*                                                                                                         | :heavy_minus_sign:                                                                                               | N/A                                                                                                              |                                                                                                                  |
| `callId`                                                                                                         | *string*                                                                                                         | :heavy_check_mark:                                                                                               | N/A                                                                                                              |                                                                                                                  |
| `output`                                                                                                         | *models.FunctionCallOutputItemOutputUnion2*                                                                      | :heavy_check_mark:                                                                                               | N/A                                                                                                              |                                                                                                                  |
| `status`                                                                                                         | [models.ToolCallStatusEnum](../models/toolcallstatusenum.md)                                                     | :heavy_minus_sign:                                                                                               | N/A                                                                                                              | completed                                                                                                        |