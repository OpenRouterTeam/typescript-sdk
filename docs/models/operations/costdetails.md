# CostDetails

Breakdown of upstream inference costs

## Example Usage

```typescript
import { CostDetails } from "@openrouter/sdk/models/operations";

let value: CostDetails = {
  upstreamInferenceCompletionsCost: 0.0004,
  upstreamInferencePromptCost: 0.0008,
};
```

## Fields

| Field                                                                                                                                   | Type                                                                                                                                    | Required                                                                                                                                | Description                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `lineItems`                                                                                                                             | [models.CostLineItem](../../models/costlineitem.md)[]                                                                                   | :heavy_minus_sign:                                                                                                                      | Itemized billing breakdown showing what was charged and why. Supported in image generation responses only, more modalities coming soon. |
| `upstreamInferenceCompletionsCost`                                                                                                      | *number*                                                                                                                                | :heavy_check_mark:                                                                                                                      | N/A                                                                                                                                     |
| `upstreamInferenceCost`                                                                                                                 | *number*                                                                                                                                | :heavy_minus_sign:                                                                                                                      | N/A                                                                                                                                     |
| `upstreamInferencePromptCost`                                                                                                           | *number*                                                                                                                                | :heavy_check_mark:                                                                                                                      | N/A                                                                                                                                     |