# InstructionsFunctionCallOutput

## Example Usage

```typescript
import { InstructionsFunctionCallOutput } from "@openrouter/sdk/models";

let value: InstructionsFunctionCallOutput = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
  status: "completed",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `type`                                                                                       | [models.InstructionsTypeFunctionCallOutput](../models/instructionstypefunctioncalloutput.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `id`                                                                                         | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `callId`                                                                                     | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `output`                                                                                     | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `status`                                                                                     | [models.ToolCallStatus](../models/toolcallstatus.md)                                         | :heavy_minus_sign:                                                                           | N/A                                                                                          | completed                                                                                    |