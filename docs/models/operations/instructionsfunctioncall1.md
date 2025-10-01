# InstructionsFunctionCall1

## Example Usage

```typescript
import { InstructionsFunctionCall1 } from "@openrouter/sdk/models/operations";

let value: InstructionsFunctionCall1 = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `type`                                                                                               | [operations.InstructionsTypeFunctionCall1](../../models/operations/instructionstypefunctioncall1.md) | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `callId`                                                                                             | *string*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `name`                                                                                               | *string*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `arguments`                                                                                          | *string*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `id`                                                                                                 | *string*                                                                                             | :heavy_minus_sign:                                                                                   | N/A                                                                                                  |
| `status`                                                                                             | [operations.InstructionsStatusEnum1](../../models/operations/instructionsstatusenum1.md)             | :heavy_minus_sign:                                                                                   | N/A                                                                                                  |