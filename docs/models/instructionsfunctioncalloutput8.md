# InstructionsFunctionCallOutput8

## Example Usage

```typescript
import { InstructionsFunctionCallOutput8 } from "@openrouter/sdk/models";

let value: InstructionsFunctionCallOutput8 = {
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
| `type`                                                                                         | [models.InstructionsTypeFunctionCallOutput8](../models/instructionstypefunctioncalloutput8.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `id`                                                                                           | *string*                                                                                       | :heavy_minus_sign:                                                                             | N/A                                                                                            |                                                                                                |
| `callId`                                                                                       | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `output`                                                                                       | *models.StreamEventsOutput16*                                                                  | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `status`                                                                                       | [models.StreamEventsStatus11](../models/streameventsstatus11.md)                               | :heavy_minus_sign:                                                                             | N/A                                                                                            | completed                                                                                      |