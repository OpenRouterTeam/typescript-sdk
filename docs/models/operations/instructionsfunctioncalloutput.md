# InstructionsFunctionCallOutput

## Example Usage

```typescript
import { InstructionsFunctionCallOutput } from "@openrouter/sdk/models/operations";

let value: InstructionsFunctionCallOutput = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
};
```

## Fields

| Field                                                                                                          | Type                                                                                                           | Required                                                                                                       | Description                                                                                                    |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                         | [operations.InstructionsTypeFunctionCallOutput](../../models/operations/instructionstypefunctioncalloutput.md) | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `id`                                                                                                           | *string*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `callId`                                                                                                       | *string*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `output`                                                                                                       | *string*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `status`                                                                                                       | [operations.InstructionsStatusEnum2](../../models/operations/instructionsstatusenum2.md)                       | :heavy_minus_sign:                                                                                             | N/A                                                                                                            |