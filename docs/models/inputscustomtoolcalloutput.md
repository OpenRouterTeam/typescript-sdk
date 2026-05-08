# InputsCustomToolCallOutput

## Example Usage

```typescript
import { InputsCustomToolCallOutput } from "@openrouter/sdk/models";

let value: InputsCustomToolCallOutput = {
  callId: "<id>",
  output: "<value>",
  type: "custom_tool_call_output",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `callId`                                                                 | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `id`                                                                     | *string*                                                                 | :heavy_minus_sign:                                                       | N/A                                                                      |
| `output`                                                                 | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `type`                                                                   | [models.TypeCustomToolCallOutput](../models/typecustomtoolcalloutput.md) | :heavy_check_mark:                                                       | N/A                                                                      |