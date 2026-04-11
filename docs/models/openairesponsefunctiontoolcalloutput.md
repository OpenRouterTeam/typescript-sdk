# OpenAIResponseFunctionToolCallOutput

## Example Usage

```typescript
import { OpenAIResponseFunctionToolCallOutput } from "@openrouter/sdk/models";

let value: OpenAIResponseFunctionToolCallOutput = {
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
  type: "function_call_output",
};
```

## Fields

| Field                                                                                                        | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  | Example                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `callId`                                                                                                     | *string*                                                                                                     | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `id`                                                                                                         | *string*                                                                                                     | :heavy_minus_sign:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `output`                                                                                                     | *models.OpenAIResponseFunctionToolCallOutputOutput2*                                                         | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `status`                                                                                                     | [models.OpenAIResponseFunctionToolCallOutputStatus](../models/openairesponsefunctiontoolcalloutputstatus.md) | :heavy_minus_sign:                                                                                           | N/A                                                                                                          | completed                                                                                                    |
| `type`                                                                                                       | [models.OpenAIResponseFunctionToolCallOutputType](../models/openairesponsefunctiontoolcalloutputtype.md)     | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |