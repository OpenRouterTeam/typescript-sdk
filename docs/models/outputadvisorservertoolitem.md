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

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `advice`                                                                 | *string*                                                                 | :heavy_minus_sign:                                                       | The advisor model's response (the advice text returned to the executor). |                                                                          |
| `error`                                                                  | *string*                                                                 | :heavy_minus_sign:                                                       | Error message when the advisor call did not produce advice.              |                                                                          |
| `id`                                                                     | *string*                                                                 | :heavy_minus_sign:                                                       | N/A                                                                      |                                                                          |
| `model`                                                                  | *string*                                                                 | :heavy_minus_sign:                                                       | Slug of the advisor model that was consulted.                            |                                                                          |
| `prompt`                                                                 | *string*                                                                 | :heavy_minus_sign:                                                       | The prompt the executor sent to the advisor.                             |                                                                          |
| `status`                                                                 | [models.ToolCallStatus](../models/toolcallstatus.md)                     | :heavy_check_mark:                                                       | N/A                                                                      | completed                                                                |
| `type`                                                                   | *"openrouter:advisor"*                                                   | :heavy_check_mark:                                                       | N/A                                                                      |                                                                          |