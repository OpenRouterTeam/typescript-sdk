# Pricing

## Example Usage

```typescript
import { Pricing } from "@openrouter/sdk/models";

let value: Pricing = {
  prompt: 1000,
  completion: "<value>",
};
```

## Fields

| Field               | Type                | Required            | Description         |
| ------------------- | ------------------- | ------------------- | ------------------- |
| `prompt`            | *any*               | :heavy_check_mark:  | N/A                 |
| `completion`        | *any*               | :heavy_check_mark:  | N/A                 |
| `request`           | *any*               | :heavy_minus_sign:  | N/A                 |
| `image`             | *any*               | :heavy_minus_sign:  | N/A                 |
| `imageToken`        | *any*               | :heavy_minus_sign:  | N/A                 |
| `imageOutput`       | *any*               | :heavy_minus_sign:  | N/A                 |
| `audio`             | *any*               | :heavy_minus_sign:  | N/A                 |
| `inputAudioCache`   | *any*               | :heavy_minus_sign:  | N/A                 |
| `webSearch`         | *any*               | :heavy_minus_sign:  | N/A                 |
| `internalReasoning` | *any*               | :heavy_minus_sign:  | N/A                 |
| `inputCacheRead`    | *any*               | :heavy_minus_sign:  | N/A                 |
| `inputCacheWrite`   | *any*               | :heavy_minus_sign:  | N/A                 |
| `discount`          | *number*            | :heavy_minus_sign:  | N/A                 |