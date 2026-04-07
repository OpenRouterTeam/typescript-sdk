# InstructionsFunctionCallOutput9

## Example Usage

```typescript
import { InstructionsFunctionCallOutput9 } from "@openrouter/sdk/models";

let value: InstructionsFunctionCallOutput9 = {
  type: "function_call_output",
  callId: "<id>",
  output: [],
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    | Example                                                                                        |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [models.InstructionsTypeFunctionCallOutput9](../models/instructionstypefunctioncalloutput9.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `id`                                                                                           | *string*                                                                                       | :heavy_minus_sign:                                                                             | N/A                                                                                            |                                                                                                |
| `callId`                                                                                       | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `output`                                                                                       | *models.StreamEventsOutput18*                                                                  | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `status`                                                                                       | [models.ToolCallStatusEnum](../models/toolcallstatusenum.md)                                   | :heavy_minus_sign:                                                                             | N/A                                                                                            | completed                                                                                      |