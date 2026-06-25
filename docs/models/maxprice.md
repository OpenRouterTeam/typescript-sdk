# MaxPrice

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript
import { MaxPrice } from "@openrouter/sdk/models";

let value: MaxPrice = {};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `audio`                                            | *string*                                           | :heavy_minus_sign:                                 | Maximum price in USD per audio unit                |
| `completion`                                       | *string*                                           | :heavy_minus_sign:                                 | Maximum price in USD per million completion tokens |
| `image`                                            | *string*                                           | :heavy_minus_sign:                                 | Maximum price in USD per image                     |
| `prompt`                                           | *string*                                           | :heavy_minus_sign:                                 | Maximum price in USD per million prompt tokens     |
| `request`                                          | *string*                                           | :heavy_minus_sign:                                 | Maximum price in USD per request                   |