# OpenAIResponseFunctionToolCall

## Example Usage

```typescript
import { OpenAIResponseFunctionToolCall } from "@openrouter/sdk/models";

let value: OpenAIResponseFunctionToolCall = {
  type: "function_call",
  callId: "call-abc123",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\"}",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `type`                                                                                       | [models.OpenAIResponseFunctionToolCallType](../models/openairesponsefunctiontoolcalltype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `callId`                                                                                     | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `name`                                                                                       | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `arguments`                                                                                  | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `id`                                                                                         | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `status`                                                                                     | [models.ToolCallStatus](../models/toolcallstatus.md)                                         | :heavy_minus_sign:                                                                           | N/A                                                                                          | completed                                                                                    |