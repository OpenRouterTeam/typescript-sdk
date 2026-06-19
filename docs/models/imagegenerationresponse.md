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

| Field                                                                                 | Type                                                                                  | Required                                                                              | Description                                                                           | Example                                                                               |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `created`                                                                             | *number*                                                                              | :heavy_check_mark:                                                                    | Unix timestamp (seconds) when the image was generated                                 | 1748372400                                                                            |
| `data`                                                                                | [models.ImageGenerationResponseData](../models/imagegenerationresponsedata.md)[]      | :heavy_check_mark:                                                                    | Generated images                                                                      |                                                                                       |
| `usage`                                                                               | [models.CompletionResponseUsage](../models/completionresponseusage.md)                | :heavy_minus_sign:                                                                    | Token and cost usage for a completion request, when available.                        | {<br/>"completion_tokens": 150,<br/>"cost": 0.001,<br/>"prompt_tokens": 25,<br/>"total_tokens": 175<br/>} |