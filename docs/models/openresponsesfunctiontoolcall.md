# OpenResponsesFunctionToolCall

A function call initiated by the model

## Example Usage

```typescript
import { OpenResponsesFunctionToolCall } from "@openrouter/sdk/models";

let value: OpenResponsesFunctionToolCall = {
  type: "function_call",
  callId: "call-abc123",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\"}",
  id: "call-abc123",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `type`                                                                                     | [models.OpenResponsesFunctionToolCallType](../models/openresponsesfunctiontoolcalltype.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `callId`                                                                                   | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `name`                                                                                     | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `arguments`                                                                                | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `status`                                                                                   | [models.ToolCallStatus](../models/toolcallstatus.md)                                       | :heavy_minus_sign:                                                                         | N/A                                                                                        | completed                                                                                  |