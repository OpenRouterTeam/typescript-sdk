# OutputCustomToolCallItem

A call to a custom (freeform-grammar) tool created by the model — distinct from `function_call`. Used for tools like Codex CLI's `apply_patch` whose payload is opaque text rather than JSON arguments.

## Example Usage

```typescript
import { OutputCustomToolCallItem } from "@openrouter/sdk/models";

let value: OutputCustomToolCallItem = {
  callId: "<id>",
  input: "<value>",
  name: "<value>",
  type: "custom_tool_call",
};
```

## Fields

| Field                                                                                           | Type                                                                                            | Required                                                                                        | Description                                                                                     |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `callId`                                                                                        | *string*                                                                                        | :heavy_check_mark:                                                                              | N/A                                                                                             |
| `id`                                                                                            | *string*                                                                                        | :heavy_minus_sign:                                                                              | N/A                                                                                             |
| `input`                                                                                         | *string*                                                                                        | :heavy_check_mark:                                                                              | N/A                                                                                             |
| `name`                                                                                          | *string*                                                                                        | :heavy_check_mark:                                                                              | N/A                                                                                             |
| `namespace`                                                                                     | *string*                                                                                        | :heavy_minus_sign:                                                                              | Namespace qualifier for tools registered as part of a namespace tool group (e.g. an MCP server) |
| `type`                                                                                          | *"custom_tool_call"*                                                                            | :heavy_check_mark:                                                                              | N/A                                                                                             |