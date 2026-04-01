# FunctionCallArgsDoneEvent

Event emitted when function call arguments streaming is complete

## Example Usage

```typescript
import { FunctionCallArgsDoneEvent } from "@openrouter/sdk/models";

let value: FunctionCallArgsDoneEvent = {
  type: "response.function_call_arguments.done",
  itemId: "<id>",
  outputIndex: 513.28,
  name: "<value>",
  arguments: "<value>",
  sequenceNumber: 0,
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `type`                                    | *"response.function_call_arguments.done"* | :heavy_check_mark:                        | N/A                                       |
| `itemId`                                  | *string*                                  | :heavy_check_mark:                        | N/A                                       |
| `outputIndex`                             | *number*                                  | :heavy_check_mark:                        | N/A                                       |
| `name`                                    | *string*                                  | :heavy_check_mark:                        | N/A                                       |
| `arguments`                               | *string*                                  | :heavy_check_mark:                        | N/A                                       |
| `sequenceNumber`                          | *number*                                  | :heavy_check_mark:                        | N/A                                       |