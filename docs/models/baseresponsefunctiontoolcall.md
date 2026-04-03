# BaseResponseFunctionToolCall

## Example Usage

```typescript
import { BaseResponseFunctionToolCall } from "@openrouter/sdk/models";

let value: BaseResponseFunctionToolCall = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `type`                                                                                       | [models.BaseResponseFunctionToolCallType](../models/baseresponsefunctiontoolcalltype.md)     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `callId`                                                                                     | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `name`                                                                                       | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `arguments`                                                                                  | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `id`                                                                                         | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `status`                                                                                     | [models.BaseResponseFunctionToolCallStatus](../models/baseresponsefunctiontoolcallstatus.md) | :heavy_minus_sign:                                                                           | N/A                                                                                          | completed                                                                                    |