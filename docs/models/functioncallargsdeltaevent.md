# FunctionCallArgsDeltaEvent

Event emitted when function call arguments are being streamed

## Example Usage

```typescript
import { FunctionCallArgsDeltaEvent } from "@openrouter/sdk/models";

let value: FunctionCallArgsDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 986115,
  sequenceNumber: 0,
  type: "response.function_call_arguments.delta",
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `delta`                                    | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `itemId`                                   | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `outputIndex`                              | *number*                                   | :heavy_check_mark:                         | N/A                                        |
| `sequenceNumber`                           | *number*                                   | :heavy_check_mark:                         | N/A                                        |
| `type`                                     | *"response.function_call_arguments.delta"* | :heavy_check_mark:                         | N/A                                        |