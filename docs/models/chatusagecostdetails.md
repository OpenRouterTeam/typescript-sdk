# ChatUsageCostDetails

Breakdown of upstream inference costs

## Example Usage

```typescript
import { ChatUsageCostDetails } from "@openrouter/sdk/models";

let value: ChatUsageCostDetails = {
  upstreamInferenceCompletionsCost: 4622.23,
  upstreamInferencePromptCost: 3730.85,
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `upstreamInferenceCompletionsCost`                      | *number*                                                | :heavy_check_mark:                                      | Upstream cost for completion/output tokens              |
| `upstreamInferenceCost`                                 | *number*                                                | :heavy_minus_sign:                                      | Total upstream inference cost (shown for BYOK requests) |
| `upstreamInferencePromptCost`                           | *number*                                                | :heavy_check_mark:                                      | Upstream cost for prompt/input tokens                   |