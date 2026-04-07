# InstructionsFunctionCallOutput10

## Example Usage

```typescript
import { InstructionsFunctionCallOutput10 } from "@openrouter/sdk/models";

let value: InstructionsFunctionCallOutput10 = {
  type: "function_call_output",
  callId: "<id>",
  output: "<value>",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      | Example                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `type`                                                                                           | [models.InstructionsTypeFunctionCallOutput10](../models/instructionstypefunctioncalloutput10.md) | :heavy_check_mark:                                                                               | N/A                                                                                              |                                                                                                  |
| `id`                                                                                             | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |
| `callId`                                                                                         | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |                                                                                                  |
| `output`                                                                                         | *models.StreamEventsOutput20*                                                                    | :heavy_check_mark:                                                                               | N/A                                                                                              |                                                                                                  |
| `status`                                                                                         | [models.StreamEventsStatus14](../models/streameventsstatus14.md)                                 | :heavy_minus_sign:                                                                               | N/A                                                                                              | completed                                                                                        |