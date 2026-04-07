# InstructionsFunctionCallOutput6

## Example Usage

```typescript
import { InstructionsFunctionCallOutput6 } from "@openrouter/sdk/models";

let value: InstructionsFunctionCallOutput6 = {
  type: "function_call_output",
  callId: "<id>",
  output: "<value>",
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    | Example                                                                                        |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [models.InstructionsTypeFunctionCallOutput6](../models/instructionstypefunctioncalloutput6.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `id`                                                                                           | *string*                                                                                       | :heavy_minus_sign:                                                                             | N/A                                                                                            |                                                                                                |
| `callId`                                                                                       | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `output`                                                                                       | *models.StreamEventsOutput12*                                                                  | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `status`                                                                                       | [models.StreamEventsStatus8](../models/streameventsstatus8.md)                                 | :heavy_minus_sign:                                                                             | N/A                                                                                            | completed                                                                                      |