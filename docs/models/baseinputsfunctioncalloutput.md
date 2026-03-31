# BaseInputsFunctionCallOutput

## Example Usage

```typescript
import { BaseInputsFunctionCallOutput } from "@openrouter/sdk/models";

let value: BaseInputsFunctionCallOutput = {
  type: "function_call_output",
  callId: "<id>",
  output: "<value>",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              | Example                                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `type`                                                                                   | [models.BaseInputsTypeFunctionCallOutput](../models/baseinputstypefunctioncalloutput.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |
| `id`                                                                                     | *string*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |                                                                                          |
| `callId`                                                                                 | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |
| `output`                                                                                 | *models.BaseInputsOutput2*                                                               | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |
| `status`                                                                                 | [models.ToolCallStatusEnum](../models/toolcallstatusenum.md)                             | :heavy_minus_sign:                                                                       | N/A                                                                                      | completed                                                                                |