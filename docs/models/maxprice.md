# MaxPrice

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript
import { MaxPrice } from "@openrouter/sdk/models";

let value: MaxPrice = {};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               | Example                                                   |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `prompt`                                                  | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `completion`                                              | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `image`                                                   | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `audio`                                                   | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |
| `request`                                                 | *number*                                                  | :heavy_minus_sign:                                        | A value in string or number format that is a large number | 1000                                                      |