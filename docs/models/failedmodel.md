# FailedModel

## Example Usage

```typescript
import { FailedModel } from "@openrouter/sdk/models";

let value: FailedModel = {
  error: "<value>",
  model: "XTS",
  reason: "length",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `error`                                                                                  | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `finishReason`                                                                           | *string*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `model`                                                                                  | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `reason`                                                                                 | [models.OutputFusionServerToolItemReason](../models/outputfusionservertoolitemreason.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |