# OpenAIResponsesInputFunctionCallOutput

## Example Usage

```typescript
import { OpenAIResponsesInputFunctionCallOutput } from "@openrouter/sdk/models";

let value: OpenAIResponsesInputFunctionCallOutput = {
  type: "function_call_output",
  callId: "<id>",
  output: [],
};
```

## Fields

| Field                                                                                                        | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  | Example                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                       | [models.OpenAIResponsesInputTypeFunctionCallOutput](../models/openairesponsesinputtypefunctioncalloutput.md) | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `id`                                                                                                         | *string*                                                                                                     | :heavy_minus_sign:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `callId`                                                                                                     | *string*                                                                                                     | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `output`                                                                                                     | *models.OpenAIResponsesInputOutput2*                                                                         | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `status`                                                                                                     | [models.ToolCallStatus](../models/toolcallstatus.md)                                                         | :heavy_minus_sign:                                                                                           | N/A                                                                                                          | completed                                                                                                    |