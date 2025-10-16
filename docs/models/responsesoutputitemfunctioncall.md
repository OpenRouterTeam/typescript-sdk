# ResponsesOutputItemFunctionCall

## Example Usage

```typescript
import { ResponsesOutputItemFunctionCall } from "@openrouter/sdk/models";

let value: ResponsesOutputItemFunctionCall = {
  type: "function_call",
  id: "<id>",
  name: "<value>",
  arguments: "<value>",
  callId: "<id>",
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [models.ResponsesOutputItemTypeFunctionCall](../models/responsesoutputitemtypefunctioncall.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `id`                                                                                           | *string*                                                                                       | :heavy_minus_sign:                                                                             | N/A                                                                                            |
| `name`                                                                                         | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `arguments`                                                                                    | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `callId`                                                                                       | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |