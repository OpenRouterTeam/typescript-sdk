# OpenResponsesInputItemFunctionCall

## Example Usage

```typescript
import { OpenResponsesInputItemFunctionCall } from "@openrouter/sdk/models";

let value: OpenResponsesInputItemFunctionCall = {
  type: "function_call",
  id: "<id>",
  name: "<value>",
  arguments: "<value>",
  callId: "<id>",
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `type`                                                                                               | [models.OpenResponsesInputItemTypeFunctionCall](../models/openresponsesinputitemtypefunctioncall.md) | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `id`                                                                                                 | *string*                                                                                             | :heavy_minus_sign:                                                                                   | N/A                                                                                                  |
| `name`                                                                                               | *string*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `arguments`                                                                                          | *string*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `callId`                                                                                             | *string*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |