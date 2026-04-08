# OutputFunctionCallItem

## Example Usage

```typescript
import { OutputFunctionCallItem } from "@openrouter/sdk/models";

let value: OutputFunctionCallItem = {
  type: "function_call",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | [models.OutputFunctionCallItemType](../models/outputfunctioncallitemtype.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `id`                                                                         | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |
| `name`                                                                       | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `arguments`                                                                  | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `callId`                                                                     | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `status`                                                                     | *models.OutputFunctionCallItemStatusUnion*                                   | :heavy_minus_sign:                                                           | N/A                                                                          |