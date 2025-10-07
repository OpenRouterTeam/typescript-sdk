# MaxPrice

The object specifying the maximum price you want to pay for this request. USD price per million tokens, for prompt and completion.

## Example Usage

```typescript
import { MaxPrice } from "@openrouter/sdk/models";

let value: MaxPrice = {
  prompt: 2656.39,
  completion: "<value>",
  image: "https://picsum.photos/seed/HxVyr/2165/190",
  audio: "<value>",
  request: "<value>",
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `prompt`                              | *models.OpenAIResponsesRequestPrompt* | :heavy_minus_sign:                    | N/A                                   |
| `completion`                          | *models.Completion*                   | :heavy_minus_sign:                    | N/A                                   |
| `image`                               | *models.Image*                        | :heavy_minus_sign:                    | N/A                                   |
| `audio`                               | *models.Audio*                        | :heavy_minus_sign:                    | N/A                                   |
| `request`                             | *models.RequestT*                     | :heavy_minus_sign:                    | N/A                                   |