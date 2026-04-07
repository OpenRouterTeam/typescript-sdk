# InstructionsFunctionCall9

## Example Usage

```typescript
import { InstructionsFunctionCall9 } from "@openrouter/sdk/models";

let value: InstructionsFunctionCall9 = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        | Example                                                                            |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `type`                                                                             | [models.InstructionsTypeFunctionCall9](../models/instructionstypefunctioncall9.md) | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `callId`                                                                           | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `name`                                                                             | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `arguments`                                                                        | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `id`                                                                               | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |                                                                                    |
| `status`                                                                           | [models.StreamEventsStatus13](../models/streameventsstatus13.md)                   | :heavy_minus_sign:                                                                 | N/A                                                                                | completed                                                                          |