# OutputFunctionCallItem

## Example Usage

```typescript
import { OutputFunctionCallItem } from "@openrouter/sdk/models";

let value: OutputFunctionCallItem = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `arguments`                                                                  | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `callId`                                                                     | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `id`                                                                         | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |
| `name`                                                                       | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `status`                                                                     | *models.OutputFunctionCallItemStatusUnion*                                   | :heavy_minus_sign:                                                           | N/A                                                                          |
| `type`                                                                       | [models.OutputFunctionCallItemType](../models/outputfunctioncallitemtype.md) | :heavy_check_mark:                                                           | N/A                                                                          |