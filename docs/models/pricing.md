# Pricing

## Example Usage

```typescript
import { Pricing } from "@openrouter/sdk/models";

let value: Pricing = {
  prompt: 1000,
  completion: "1000",
  request: "1000",
  image: 1000,
  imageOutput: 1000,
  audio: "1000",
  inputAudioCache: 1000,
  webSearch: 1000,
  internalReasoning: "1000",
  inputCacheRead: 1000,
  inputCacheWrite: 1000,
  discount: 1863.9,
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `prompt`                                                  | *any*                                                     | :heavy_check_mark:                                        | A value in string or number format that is a large number |
| `completion`                                              | *any*                                                     | :heavy_check_mark:                                        | A value in string or number format that is a large number |
| `request`                                                 | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `image`                                                   | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `imageOutput`                                             | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `audio`                                                   | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `inputAudioCache`                                         | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `webSearch`                                               | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `internalReasoning`                                       | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `inputCacheRead`                                          | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `inputCacheWrite`                                         | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `discount`                                                | *number*                                                  | :heavy_minus_sign:                                        | N/A                                                       |