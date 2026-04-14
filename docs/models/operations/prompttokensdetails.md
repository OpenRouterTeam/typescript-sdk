# PromptTokensDetails

Per-modality token breakdown. Only present when the upstream provider returns modality-level usage data.

## Example Usage

```typescript
import { PromptTokensDetails } from "@openrouter/sdk/models/operations";

let value: PromptTokensDetails = {};
```

## Fields

| Field                               | Type                                | Required                            | Description                         | Example                             |
| ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| `audioTokens`                       | *number*                            | :heavy_minus_sign:                  | Number of audio tokens in the input | 0                                   |
| `imageTokens`                       | *number*                            | :heavy_minus_sign:                  | Number of image tokens in the input | 258                                 |
| `textTokens`                        | *number*                            | :heavy_minus_sign:                  | Number of text tokens in the input  | 8                                   |
| `videoTokens`                       | *number*                            | :heavy_minus_sign:                  | Number of video tokens in the input | 0                                   |