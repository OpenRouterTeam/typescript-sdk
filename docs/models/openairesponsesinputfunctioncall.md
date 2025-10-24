# OpenAIResponsesInputFunctionCall

## Example Usage

```typescript
import { OpenAIResponsesInputFunctionCall } from "@openrouter/sdk/models";

let value: OpenAIResponsesInputFunctionCall = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
  id: "<id>",
  status: "completed",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      | Example                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `type`                                                                                           | [models.OpenAIResponsesInputTypeFunctionCall](../models/openairesponsesinputtypefunctioncall.md) | :heavy_check_mark:                                                                               | N/A                                                                                              |                                                                                                  |
| `callId`                                                                                         | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |                                                                                                  |
| `name`                                                                                           | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |                                                                                                  |
| `arguments`                                                                                      | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |                                                                                                  |
| `id`                                                                                             | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |
| `status`                                                                                         | [models.ToolCallStatus](../models/toolcallstatus.md)                                             | :heavy_minus_sign:                                                                               | N/A                                                                                              | completed                                                                                        |