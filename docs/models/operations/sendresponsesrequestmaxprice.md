# SendResponsesRequestMaxPrice

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript
import { SendResponsesRequestMaxPrice } from "@openrouter/sdk/models/operations";

let value: SendResponsesRequestMaxPrice = {
  prompt: "<value>",
  completion: "<value>",
  image: "https://picsum.photos/seed/F0DG5u3jyG/2259/1194",
  audio: "<value>",
  request: "<value>",
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `prompt`                                      | *operations.SendResponsesRequestPrompt*       | :heavy_minus_sign:                            | N/A                                           |
| `completion`                                  | *operations.SendResponsesRequestCompletion*   | :heavy_minus_sign:                            | N/A                                           |
| `image`                                       | *operations.SendResponsesRequestImage*        | :heavy_minus_sign:                            | N/A                                           |
| `audio`                                       | *operations.SendResponsesRequestAudio*        | :heavy_minus_sign:                            | N/A                                           |
| `request`                                     | *operations.SendResponsesRequestRequestUnion* | :heavy_minus_sign:                            | N/A                                           |