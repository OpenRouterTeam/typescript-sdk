# InstructionsFunctionCallOutput5

## Example Usage

```typescript
import { InstructionsFunctionCallOutput5 } from "@openrouter/sdk/models";

let value: InstructionsFunctionCallOutput5 = {
  type: "function_call_output",
  callId: "<id>",
  output: "<value>",
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    | Example                                                                                        |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [models.InstructionsTypeFunctionCallOutput5](../models/instructionstypefunctioncalloutput5.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `id`                                                                                           | *string*                                                                                       | :heavy_minus_sign:                                                                             | N/A                                                                                            |                                                                                                |
| `callId`                                                                                       | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `output`                                                                                       | *models.StreamEventsOutput10*                                                                  | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `status`                                                                                       | [models.ToolCallStatusEnum](../models/toolcallstatusenum.md)                                   | :heavy_minus_sign:                                                                             | N/A                                                                                            | completed                                                                                      |