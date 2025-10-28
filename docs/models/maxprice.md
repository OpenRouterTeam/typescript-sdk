# MaxPrice

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript
import { MaxPrice } from "@openrouter/sdk/models";

let value: MaxPrice = {
  prompt: 1000,
  completion: 1000,
  image: 1000,
  audio: 1000,
  request: "1000",
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `prompt`                                                  | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `completion`                                              | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `image`                                                   | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `audio`                                                   | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |
| `request`                                                 | *any*                                                     | :heavy_minus_sign:                                        | A value in string or number format that is a large number |