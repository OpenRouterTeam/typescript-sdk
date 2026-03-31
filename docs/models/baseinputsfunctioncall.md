# BaseInputsFunctionCall

## Example Usage

```typescript
import { BaseInputsFunctionCall } from "@openrouter/sdk/models";

let value: BaseInputsFunctionCall = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  | Example                                                                      |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | [models.BaseInputsTypeFunctionCall](../models/baseinputstypefunctioncall.md) | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `callId`                                                                     | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `name`                                                                       | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `arguments`                                                                  | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `id`                                                                         | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |                                                                              |
| `status`                                                                     | [models.ToolCallStatusEnum](../models/toolcallstatusenum.md)                 | :heavy_minus_sign:                                                           | N/A                                                                          | completed                                                                    |