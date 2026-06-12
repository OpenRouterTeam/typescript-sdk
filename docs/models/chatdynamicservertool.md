# ChatDynamicServerTool

Generic OpenRouter server-tool envelope. `type` names a registered server tool (canonical `openrouter:*` form or a registered shorthand); `parameters` carries tool-specific configuration validated against the tool definition.

## Example Usage

```typescript
import { ChatDynamicServerTool } from "@openrouter/sdk/models";

let value: ChatDynamicServerTool = {
  type: "function",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `parameters`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `type`                | *string*              | :heavy_check_mark:    | N/A                   |