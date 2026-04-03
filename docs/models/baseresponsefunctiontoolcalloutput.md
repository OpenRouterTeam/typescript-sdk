# BaseResponseFunctionToolCallOutput

## Example Usage

```typescript
import { BaseResponseFunctionToolCallOutput } from "@openrouter/sdk/models";

let value: BaseResponseFunctionToolCallOutput = {
  type: "function_call_output",
  callId: "<id>",
  output: [],
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          | Example                                                                                              |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `type`                                                                                               | [models.BaseResponseFunctionToolCallOutputType](../models/baseresponsefunctiontoolcalloutputtype.md) | :heavy_check_mark:                                                                                   | N/A                                                                                                  |                                                                                                      |
| `id`                                                                                                 | *string*                                                                                             | :heavy_minus_sign:                                                                                   | N/A                                                                                                  |                                                                                                      |
| `callId`                                                                                             | *string*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |                                                                                                      |
| `output`                                                                                             | *models.BaseResponseFunctionToolCallOutputOutput2*                                                   | :heavy_check_mark:                                                                                   | N/A                                                                                                  |                                                                                                      |
| `status`                                                                                             | [models.ToolCallStatusEnum](../models/toolcallstatusenum.md)                                         | :heavy_minus_sign:                                                                                   | N/A                                                                                                  | completed                                                                                            |