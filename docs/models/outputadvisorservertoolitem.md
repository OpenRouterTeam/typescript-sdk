# OutputAdvisorServerToolItem

An openrouter:advisor server tool output item

## Example Usage

```typescript
import { OutputAdvisorServerToolItem } from "@openrouter/sdk/models";

let value: OutputAdvisorServerToolItem = {
  status: "completed",
  type: "openrouter:advisor",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `advice`                                             | *string*                                             | :heavy_minus_sign:                                   | The strategic guidance returned by the advisor model |                                                      |
| `id`                                                 | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `model`                                              | *string*                                             | :heavy_minus_sign:                                   | The advisor model that provided the guidance         |                                                      |
| `status`                                             | [models.ToolCallStatus](../models/toolcallstatus.md) | :heavy_check_mark:                                   | N/A                                                  | completed                                            |
| `type`                                               | *"openrouter:advisor"*                               | :heavy_check_mark:                                   | N/A                                                  |                                                      |