# FusionPluginTool

## Example Usage

```typescript
import { FusionPluginTool } from "@openrouter/sdk/models";

let value: FusionPluginTool = {
  type: "<value>",
};
```

## Fields

| Field                                                                               | Type                                                                                | Required                                                                            | Description                                                                         |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `parameters`                                                                        | Record<string, *any*>                                                               | :heavy_minus_sign:                                                                  | Optional configuration forwarded as the tool's `parameters` object.                 |
| `type`                                                                              | *string*                                                                            | :heavy_check_mark:                                                                  | Server tool type identifier (e.g. "openrouter:web_search", "openrouter:web_fetch"). |