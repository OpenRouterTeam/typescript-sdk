# ResponseFunctionCallOutputItem

Function call output item in Responses API

## Example Usage

```typescript
import { ResponseFunctionCallOutputItem } from "@openrouter/sdk/models";

let value: ResponseFunctionCallOutputItem = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
  status: "completed",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `type`                                                                                       | [models.ResponseFunctionCallOutputItemType](../models/responsefunctioncalloutputitemtype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `id`                                                                                         | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `callId`                                                                                     | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `output`                                                                                     | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `status`                                                                                     | [models.ResponseFunctionCallStatus](../models/responsefunctioncallstatus.md)                 | :heavy_minus_sign:                                                                           | N/A                                                                                          | completed                                                                                    |