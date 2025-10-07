# MaxPrice

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript
import { MaxPrice } from "@openrouter/sdk/models/operations";

let value: MaxPrice = {
  prompt: 2656.39,
  completion: "<value>",
  image: "https://picsum.photos/seed/HxVyr/2165/190",
  audio: "<value>",
  request: "<value>",
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `prompt`                          | *operations.GeneratePrompt*       | :heavy_minus_sign:                | N/A                               |
| `completion`                      | *operations.GenerateCompletion*   | :heavy_minus_sign:                | N/A                               |
| `image`                           | *operations.GenerateImage*        | :heavy_minus_sign:                | N/A                               |
| `audio`                           | *operations.GenerateAudio*        | :heavy_minus_sign:                | N/A                               |
| `request`                         | *operations.GenerateRequestUnion* | :heavy_minus_sign:                | N/A                               |