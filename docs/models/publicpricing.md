# PublicPricing

Pricing information for the model

## Example Usage

```typescript
import { PublicPricing } from "@openrouter/sdk/models";

let value: PublicPricing = {
  completion: "0.00006",
  prompt: "0.00003",
};
```

## Fields

| Field               | Type                | Required            | Description         | Example             |
| ------------------- | ------------------- | ------------------- | ------------------- | ------------------- |
| `audio`             | *string*            | :heavy_minus_sign:  | N/A                 | 1000                |
| `audioOutput`       | *string*            | :heavy_minus_sign:  | N/A                 | 1000                |
| `completion`        | *string*            | :heavy_check_mark:  | N/A                 | 1000                |
| `discount`          | *number*            | :heavy_minus_sign:  | N/A                 |                     |
| `image`             | *string*            | :heavy_minus_sign:  | N/A                 | 1000                |
| `imageOutput`       | *string*            | :heavy_minus_sign:  | N/A                 | 1000                |
| `imageToken`        | *string*            | :heavy_minus_sign:  | N/A                 | 1000                |
| `inputAudioCache`   | *string*            | :heavy_minus_sign:  | N/A                 | 1000                |
| `inputCacheRead`    | *string*            | :heavy_minus_sign:  | N/A                 | 1000                |
| `inputCacheWrite`   | *string*            | :heavy_minus_sign:  | N/A                 | 1000                |
| `internalReasoning` | *string*            | :heavy_minus_sign:  | N/A                 | 1000                |
| `prompt`            | *string*            | :heavy_check_mark:  | N/A                 | 1000                |
| `request`           | *string*            | :heavy_minus_sign:  | N/A                 | 1000                |
| `webSearch`         | *string*            | :heavy_minus_sign:  | N/A                 | 1000                |