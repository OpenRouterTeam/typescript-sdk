# InstructionsFunctionCall7

## Example Usage

```typescript
import { InstructionsFunctionCall7 } from "@openrouter/sdk/models";

let value: InstructionsFunctionCall7 = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        | Example                                                                            |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `type`                                                                             | [models.InstructionsTypeFunctionCall7](../models/instructionstypefunctioncall7.md) | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `callId`                                                                           | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `name`                                                                             | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `arguments`                                                                        | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `id`                                                                               | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |                                                                                    |
| `status`                                                                           | [models.StreamEventsStatus10](../models/streameventsstatus10.md)                   | :heavy_minus_sign:                                                                 | N/A                                                                                | completed                                                                          |