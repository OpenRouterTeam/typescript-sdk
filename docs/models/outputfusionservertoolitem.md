# OutputFusionServerToolItem

An openrouter:fusion server tool output item

## Example Usage

```typescript
import { OutputFusionServerToolItem } from "@openrouter/sdk/models";

let value: OutputFusionServerToolItem = {
  status: "completed",
  type: "openrouter:fusion",
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               | Example                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `analysis`                                                                | [models.Analysis](../models/analysis.md)                                  | :heavy_minus_sign:                                                        | Structured analysis produced by the fusion judge model.                   |                                                                           |
| `error`                                                                   | *string*                                                                  | :heavy_minus_sign:                                                        | Error message when the fusion run did not produce an analysis result.     |                                                                           |
| `id`                                                                      | *string*                                                                  | :heavy_minus_sign:                                                        | N/A                                                                       |                                                                           |
| `responses`                                                               | [models.ResponseT](../models/responset.md)[]                              | :heavy_minus_sign:                                                        | Slugs of the analysis models that produced a response in this fusion run. |                                                                           |
| `status`                                                                  | [models.ToolCallStatus](../models/toolcallstatus.md)                      | :heavy_check_mark:                                                        | N/A                                                                       | completed                                                                 |
| `type`                                                                    | *"openrouter:fusion"*                                                     | :heavy_check_mark:                                                        | N/A                                                                       |                                                                           |