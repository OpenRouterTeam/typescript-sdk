# Pricing

## Example Usage

```typescript
import { Pricing } from "@openrouter/sdk/models";

let value: Pricing = {
  prompt: 1000,
  completion: "1000",
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `prompt`                                                  | *any*                                                     | :heavy_check_mark:                                        | A value in string or number format that is a large number |
| `completion`                                              | *any*                                                     | :heavy_check_mark:                                        | A value in string or number format that is a large number |
| `request`                                                 | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `image`                                                   | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `imageToken`                                              | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `imageOutput`                                             | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `audio`                                                   | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `inputAudioCache`                                         | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `webSearch`                                               | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `internalReasoning`                                       | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `inputCacheRead`                                          | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `inputCacheWrite`                                         | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `discount`                                                | *number*                                                  | :heavy_minus_sign:                                        | N/A                                                       |