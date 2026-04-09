# FunctionCallArgsDoneEvent

Event emitted when function call arguments streaming is complete

## Example Usage

```typescript
import { FunctionCallArgsDoneEvent } from "@openrouter/sdk/models";

let value: FunctionCallArgsDoneEvent = {
  arguments: "<value>",
  itemId: "<id>",
  name: "<value>",
  outputIndex: 51328,
  sequenceNumber: 0,
  type: "response.function_call_arguments.done",
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `arguments`                               | *string*                                  | :heavy_check_mark:                        | N/A                                       |
| `itemId`                                  | *string*                                  | :heavy_check_mark:                        | N/A                                       |
| `name`                                    | *string*                                  | :heavy_check_mark:                        | N/A                                       |
| `outputIndex`                             | *number*                                  | :heavy_check_mark:                        | N/A                                       |
| `sequenceNumber`                          | *number*                                  | :heavy_check_mark:                        | N/A                                       |
| `type`                                    | *"response.function_call_arguments.done"* | :heavy_check_mark:                        | N/A                                       |