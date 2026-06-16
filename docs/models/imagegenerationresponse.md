# ImageGenerationResponse

Image generation response

## Example Usage

```typescript
import { ImageGenerationResponse } from "@openrouter/sdk/models";

let value: ImageGenerationResponse = {
  created: 1748372400,
  data: [
    {
      b64Json: "<base64-encoded-image>",
    },
  ],
};
```

## Fields

| Field                                                                                                            | Type                                                                                                             | Required                                                                                                         | Description                                                                                                      | Example                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `created`                                                                                                        | *number*                                                                                                         | :heavy_check_mark:                                                                                               | Best-effort Unix timestamp (seconds) for the generation. May be 0 when the provider does not return a timestamp. | 1748372400                                                                                                       |
| `data`                                                                                                           | [models.ImageGenerationResponseData](../models/imagegenerationresponsedata.md)[]                                 | :heavy_check_mark:                                                                                               | Generated images                                                                                                 |                                                                                                                  |
| `usage`                                                                                                          | [models.ImageGenerationResponseUsage](../models/imagegenerationresponseusage.md)                                 | :heavy_minus_sign:                                                                                               | Token and cost usage for the image generation request, when available                                            |                                                                                                                  |