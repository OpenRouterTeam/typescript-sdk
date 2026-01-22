# Pricing

## Example Usage

```typescript
import { Pricing } from "@openrouter/sdk/models";

let value: Pricing = {
  prompt: "1000",
  completion: "1000",
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     | Example                                         |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `prompt`                                        | *string*                                        | :heavy_check_mark:                              | A value in string format that is a large number | 1000                                            |
| `completion`                                    | *string*                                        | :heavy_check_mark:                              | A value in string format that is a large number | 1000                                            |
| `request`                                       | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `image`                                         | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `imageToken`                                    | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `imageOutput`                                   | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `audio`                                         | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `audioOutput`                                   | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `inputAudioCache`                               | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `webSearch`                                     | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `internalReasoning`                             | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `inputCacheRead`                                | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `inputCacheWrite`                               | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `discount`                                      | *number*                                        | :heavy_minus_sign:                              | N/A                                             |                                                 |