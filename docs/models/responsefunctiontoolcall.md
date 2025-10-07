# ResponseFunctionToolCall

Function tool call in Responses API

## Example Usage

```typescript
import { ResponseFunctionToolCall } from "@openrouter/sdk/models";

let value: ResponseFunctionToolCall = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
  id: "<id>",
  status: "completed",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                                                           | [models.ResponseFunctionToolCallType](../models/responsefunctiontoolcalltype.md) | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `callId`                                                                         | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `name`                                                                           | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `arguments`                                                                      | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `id`                                                                             | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |                                                                                  |
| `status`                                                                         | [models.ResponseFunctionCallStatus](../models/responsefunctioncallstatus.md)     | :heavy_minus_sign:                                                               | N/A                                                                              | completed                                                                        |