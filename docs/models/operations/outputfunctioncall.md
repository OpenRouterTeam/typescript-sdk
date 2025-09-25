# OutputFunctionCall

## Example Usage

```typescript
import { OutputFunctionCall } from "@openrouter/sdk/models/operations";

let value: OutputFunctionCall = {
  type: "function_call",
  name: "<value>",
  arguments: "<value>",
  callId: "<id>",
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `type`                                                                                 | [operations.OutputTypeFunctionCall](../../models/operations/outputtypefunctioncall.md) | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `id`                                                                                   | *string*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `name`                                                                                 | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `arguments`                                                                            | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `callId`                                                                               | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |