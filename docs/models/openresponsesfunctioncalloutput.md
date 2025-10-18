# OpenResponsesFunctionCallOutput

The output from a function call execution

## Example Usage

```typescript
import { OpenResponsesFunctionCallOutput } from "@openrouter/sdk/models";

let value: OpenResponsesFunctionCallOutput = {
  type: "function_call_output",
  id: "output-abc123",
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
  status: "completed",
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    | Example                                                                                        |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [models.OpenResponsesFunctionCallOutputType](../models/openresponsesfunctioncalloutputtype.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `id`                                                                                           | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `callId`                                                                                       | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `output`                                                                                       | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `status`                                                                                       | [models.ToolCallStatus](../models/toolcallstatus.md)                                           | :heavy_minus_sign:                                                                             | N/A                                                                                            | completed                                                                                      |