# GenerateMaxPrice

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript
import { GenerateMaxPrice } from "@openrouter/sdk/models/operations";

let value: GenerateMaxPrice = {
  prompt: 7633.07,
  completion: "<value>",
  image: "https://picsum.photos/seed/tJeEekdg99/2390/1956",
  audio: 4038.22,
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