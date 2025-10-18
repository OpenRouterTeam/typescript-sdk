# OpenResponsesInputFunctionCall

## Example Usage

```typescript
import { OpenResponsesInputFunctionCall } from "@openrouter/sdk/models";

let value: OpenResponsesInputFunctionCall = {
  type: "function_call",
  id: "call-abc123",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\",\"unit\":\"celsius\"}",
  callId: "call-abc123",
  status: "incomplete",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `type`                                                                                       | [models.OpenResponsesInputTypeFunctionCall](../models/openresponsesinputtypefunctioncall.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `id`                                                                                         | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `name`                                                                                       | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `arguments`                                                                                  | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `callId`                                                                                     | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `status`                                                                                     | *models.OpenResponsesInputStatusUnion*                                                       | :heavy_minus_sign:                                                                           | N/A                                                                                          |