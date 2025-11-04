# OpenAIResponsesInputFunctionCallOutput

## Example Usage

```typescript
import { OpenAIResponsesInputFunctionCallOutput } from "@openrouter/sdk/models";

let value: OpenAIResponsesInputFunctionCallOutput = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
};
```

## Fields

| Field                                                                                                        | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  | Example                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                       | [models.OpenAIResponsesInputTypeFunctionCallOutput](../models/openairesponsesinputtypefunctioncalloutput.md) | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `id`                                                                                                         | *string*                                                                                                     | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `callId`                                                                                                     | *string*                                                                                                     | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `output`                                                                                                     | *string*                                                                                                     | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `status`                                                                                                     | [models.ToolCallStatus](../models/toolcallstatus.md)                                                         | :heavy_minus_sign:                                                                                           | N/A                                                                                                          | completed                                                                                                    |