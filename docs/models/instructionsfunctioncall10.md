# InstructionsFunctionCall10

## Example Usage

```typescript
import { InstructionsFunctionCall10 } from "@openrouter/sdk/models";

let value: InstructionsFunctionCall10 = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `type`                                                                               | [models.InstructionsTypeFunctionCall10](../models/instructionstypefunctioncall10.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `callId`                                                                             | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `name`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `arguments`                                                                          | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `id`                                                                                 | *string*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `status`                                                                             | [models.StreamEventsStatus15](../models/streameventsstatus15.md)                     | :heavy_minus_sign:                                                                   | N/A                                                                                  | completed                                                                            |