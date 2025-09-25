# PostEmbeddingsMaxPrice

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript
import { PostEmbeddingsMaxPrice } from "@openrouter/sdk/models/operations";

let value: PostEmbeddingsMaxPrice = {};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `prompt`                                | *operations.PostEmbeddingsPrompt*       | :heavy_minus_sign:                      | N/A                                     |
| `completion`                            | *operations.PostEmbeddingsCompletion*   | :heavy_minus_sign:                      | N/A                                     |
| `image`                                 | *operations.PostEmbeddingsImage*        | :heavy_minus_sign:                      | N/A                                     |
| `audio`                                 | *operations.PostEmbeddingsAudio*        | :heavy_minus_sign:                      | N/A                                     |
| `request`                               | *operations.PostEmbeddingsRequestUnion* | :heavy_minus_sign:                      | N/A                                     |