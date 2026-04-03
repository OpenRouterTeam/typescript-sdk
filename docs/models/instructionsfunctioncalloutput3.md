# InstructionsFunctionCallOutput3

## Example Usage

```typescript
import { InstructionsFunctionCallOutput3 } from "@openrouter/sdk/models";

let value: InstructionsFunctionCallOutput3 = {
  type: "function_call_output",
  callId: "<id>",
  output: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    | Example                                                                                        |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [models.InstructionsTypeFunctionCallOutput3](../models/instructionstypefunctioncalloutput3.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `id`                                                                                           | *string*                                                                                       | :heavy_minus_sign:                                                                             | N/A                                                                                            |                                                                                                |
| `callId`                                                                                       | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `output`                                                                                       | *models.StreamEventsOutput6*                                                                   | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `status`                                                                                       | [models.ToolCallStatusEnum](../models/toolcallstatusenum.md)                                   | :heavy_minus_sign:                                                                             | N/A                                                                                            | completed                                                                                      |