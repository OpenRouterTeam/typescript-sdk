# OpenResponsesStreamEventResponseFunctionCallArgumentsDone

Event emitted when function call arguments streaming is complete

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseFunctionCallArgumentsDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseFunctionCallArgumentsDone = {
  type: "response.function_call_arguments.done",
  itemId: "item-1",
  outputIndex: 0,
  name: "get_weather",
  arguments: "{\"city\": \"San Francisco\", \"units\": \"celsius\"}",
  sequenceNumber: 6,
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `type`                                                                                             | [models.TypeResponseFunctionCallArgumentsDone](../models/typeresponsefunctioncallargumentsdone.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `itemId`                                                                                           | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `outputIndex`                                                                                      | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `name`                                                                                             | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `arguments`                                                                                        | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `sequenceNumber`                                                                                   | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |