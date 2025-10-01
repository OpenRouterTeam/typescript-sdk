# InputFunctionCallOutput

## Example Usage

```typescript
import { InputFunctionCallOutput } from "@openrouter/sdk/models/operations";

let value: InputFunctionCallOutput = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `type`                                                                                           | [operations.InputTypeFunctionCallOutput](../../models/operations/inputtypefunctioncalloutput.md) | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `id`                                                                                             | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `callId`                                                                                         | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `output`                                                                                         | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `status`                                                                                         | [operations.StatusRequestEnum2](../../models/operations/statusrequestenum2.md)                   | :heavy_minus_sign:                                                                               | N/A                                                                                              |