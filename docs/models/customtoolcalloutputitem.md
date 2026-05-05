# CustomToolCallOutputItem

Output from a custom tool call

## Example Usage

```typescript
import { CustomToolCallOutputItem } from "@openrouter/sdk/models";

let value: CustomToolCallOutputItem = {
  callId: "call-abc123",
  output: "{\"result\":\"success\"}",
  type: "custom_tool_call_output",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `callId`                                                                 | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `id`                                                                     | *string*                                                                 | :heavy_minus_sign:                                                       | N/A                                                                      |
| `output`                                                                 | *models.CustomToolCallOutputItemOutputUnion2*                            | :heavy_check_mark:                                                       | N/A                                                                      |
| `type`                                                                   | [models.TypeCustomToolCallOutput](../models/typecustomtoolcalloutput.md) | :heavy_check_mark:                                                       | N/A                                                                      |