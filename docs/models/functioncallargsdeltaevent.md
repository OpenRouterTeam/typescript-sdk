# FunctionCallArgsDeltaEvent

Event emitted when function call arguments are being streamed

## Example Usage

```typescript
import { FunctionCallArgsDeltaEvent } from "@openrouter/sdk/models";

let value: FunctionCallArgsDeltaEvent = {
  type: "response.function_call_arguments.delta",
  itemId: "item-1",
  outputIndex: 0,
  delta: "{\"city\": \"San",
  sequenceNumber: 4,
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `type`                                     | *"response.function_call_arguments.delta"* | :heavy_check_mark:                         | N/A                                        |
| `itemId`                                   | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `outputIndex`                              | *number*                                   | :heavy_check_mark:                         | N/A                                        |
| `delta`                                    | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `sequenceNumber`                           | *number*                                   | :heavy_check_mark:                         | N/A                                        |