# InputsCustomToolCall

## Example Usage

```typescript
import { InputsCustomToolCall } from "@openrouter/sdk/models";

let value: InputsCustomToolCall = {
  callId: "<id>",
  input: "<value>",
  name: "<value>",
  type: "custom_tool_call",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `callId`                                                                 | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `id`                                                                     | *string*                                                                 | :heavy_minus_sign:                                                       | N/A                                                                      |
| `input`                                                                  | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `name`                                                                   | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `status`                                                                 | *string*                                                                 | :heavy_minus_sign:                                                       | N/A                                                                      |
| `type`                                                                   | [models.InputsTypeCustomToolCall](../models/inputstypecustomtoolcall.md) | :heavy_check_mark:                                                       | N/A                                                                      |