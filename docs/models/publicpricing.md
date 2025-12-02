# PublicPricing

Pricing information for the model

## Example Usage

```typescript
import { PublicPricing } from "@openrouter/sdk/models";

let value: PublicPricing = {
  prompt: 0.00003,
  completion: 0.00006,
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               | Example                                                   |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `prompt`                                                  | *number*                                                  | :heavy_check_mark:                                        | A value in string or number format that is a large number | 1000                                                      |
| `completion`                                              | *number*                                                  | :heavy_check_mark:                                        | A value in string or number format that is a large number | 1000                                                      |
| `request`                                                 | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `image`                                                   | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `imageToken`                                              | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `imageOutput`                                             | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `audio`                                                   | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `inputAudioCache`                                         | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `webSearch`                                               | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `internalReasoning`                                       | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `inputCacheRead`                                          | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `inputCacheWrite`                                         | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `discount`                                                | *number*                                                  | :heavy_minus_sign:                                        | N/A                                                       |                                                           |