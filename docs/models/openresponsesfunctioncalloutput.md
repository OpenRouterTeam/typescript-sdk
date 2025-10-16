# OpenResponsesFunctionCallOutput

The output from a function call execution

## Example Usage

```typescript
import { OpenResponsesFunctionCallOutput } from "@openrouter/sdk/models";

let value: OpenResponsesFunctionCallOutput = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
  status: "in_progress",
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [models.OpenResponsesFunctionCallOutputType](../models/openresponsesfunctioncalloutputtype.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `id`                                                                                           | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `callId`                                                                                       | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `output`                                                                                       | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `status`                                                                                       | [models.ToolCallStatus](../models/toolcallstatus.md)                                           | :heavy_minus_sign:                                                                             | N/A                                                                                            |