# OpenAIResponseFunctionToolCallOutput

## Example Usage

```typescript
import { OpenAIResponseFunctionToolCallOutput } from "@openrouter/sdk/models";

let value: OpenAIResponseFunctionToolCallOutput = {
  type: "function_call_output",
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
};
```

## Fields

| Field                                                                                                        | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  | Example                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                       | [models.OpenAIResponseFunctionToolCallOutputType](../models/openairesponsefunctiontoolcalloutputtype.md)     | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `id`                                                                                                         | *string*                                                                                                     | :heavy_minus_sign:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `callId`                                                                                                     | *string*                                                                                                     | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `output`                                                                                                     | *models.OpenAIResponseFunctionToolCallOutputOutput2*                                                         | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |
| `status`                                                                                                     | [models.OpenAIResponseFunctionToolCallOutputStatus](../models/openairesponsefunctiontoolcalloutputstatus.md) | :heavy_minus_sign:                                                                                           | N/A                                                                                                          | completed                                                                                                    |