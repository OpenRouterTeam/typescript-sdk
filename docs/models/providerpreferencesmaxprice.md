# ProviderPreferencesMaxPrice

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript
import { ProviderPreferencesMaxPrice } from "@openrouter/sdk/models";

let value: ProviderPreferencesMaxPrice = {};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     | Example                                         |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `prompt`                                        | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `completion`                                    | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `image`                                         | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `audio`                                         | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |
| `request`                                       | *string*                                        | :heavy_minus_sign:                              | A value in string format that is a large number | 1000                                            |