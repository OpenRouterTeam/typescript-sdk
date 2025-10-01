# PostApiAlphaResponsesMaxPrice

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript
import { PostApiAlphaResponsesMaxPrice } from "@openrouter/sdk/models/operations";

let value: PostApiAlphaResponsesMaxPrice = {};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `prompt`                                         | *operations.PostApiAlphaResponsesMaxPricePrompt* | :heavy_minus_sign:                               | N/A                                              |
| `completion`                                     | *operations.PostApiAlphaResponsesCompletion*     | :heavy_minus_sign:                               | N/A                                              |
| `image`                                          | *operations.PostApiAlphaResponsesImage*          | :heavy_minus_sign:                               | N/A                                              |
| `audio`                                          | *operations.PostApiAlphaResponsesAudio*          | :heavy_minus_sign:                               | N/A                                              |
| `request`                                        | *operations.PostApiAlphaResponsesRequestUnion*   | :heavy_minus_sign:                               | N/A                                              |