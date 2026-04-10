# OpenAIResponseFunctionToolCall

## Example Usage

```typescript
import { OpenAIResponseFunctionToolCall } from "@openrouter/sdk/models";

let value: OpenAIResponseFunctionToolCall = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `arguments`                                                                                  | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `callId`                                                                                     | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `id`                                                                                         | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `name`                                                                                       | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `status`                                                                                     | [models.ToolCallStatus](../models/toolcallstatus.md)                                         | :heavy_minus_sign:                                                                           | N/A                                                                                          | completed                                                                                    |
| `type`                                                                                       | [models.OpenAIResponseFunctionToolCallType](../models/openairesponsefunctiontoolcalltype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |