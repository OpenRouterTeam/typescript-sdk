# InstructionsFunctionCall8

## Example Usage

```typescript
import { InstructionsFunctionCall8 } from "@openrouter/sdk/models";

let value: InstructionsFunctionCall8 = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        | Example                                                                            |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `type`                                                                             | [models.InstructionsTypeFunctionCall8](../models/instructionstypefunctioncall8.md) | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `callId`                                                                           | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `name`                                                                             | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `arguments`                                                                        | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `id`                                                                               | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |                                                                                    |
| `status`                                                                           | [models.StreamEventsStatus12](../models/streameventsstatus12.md)                   | :heavy_minus_sign:                                                                 | N/A                                                                                | completed                                                                          |