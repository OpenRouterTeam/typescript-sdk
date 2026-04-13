# VideoModel

## Example Usage

```typescript
import { VideoModel } from "@openrouter/sdk/models";

let value: VideoModel = {
  allowedPassthroughParameters: [],
  canonicalSlug: "google/veo-3.1",
  created: 1700000000,
  id: "google/veo-3.1",
  name: "Veo 3.1",
  supportedAspectRatios: [
    "16:9",
  ],
  supportedDurations: [
    5,
    8,
  ],
  supportedResolutions: [
    "720p",
  ],
  supportedSizes: null,
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `allowedPassthroughParameters`                                                             | *string*[]                                                                                 | :heavy_check_mark:                                                                         | List of parameters that are allowed to be passed through to the provider                   |                                                                                            |
| `canonicalSlug`                                                                            | *string*                                                                                   | :heavy_check_mark:                                                                         | Canonical slug for the model                                                               | openai/gpt-4                                                                               |
| `created`                                                                                  | *number*                                                                                   | :heavy_check_mark:                                                                         | Unix timestamp of when the model was created                                               | 1692901234                                                                                 |
| `description`                                                                              | *string*                                                                                   | :heavy_minus_sign:                                                                         | Description of the model                                                                   | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy. |
| `huggingFaceId`                                                                            | *string*                                                                                   | :heavy_minus_sign:                                                                         | Hugging Face model identifier, if applicable                                               | microsoft/DialoGPT-medium                                                                  |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | Unique identifier for the model                                                            | openai/gpt-4                                                                               |
| `name`                                                                                     | *string*                                                                                   | :heavy_check_mark:                                                                         | Display name of the model                                                                  | GPT-4                                                                                      |
| `pricingSkus`                                                                              | Record<string, *string*>                                                                   | :heavy_minus_sign:                                                                         | Pricing SKUs with provider prefix stripped, values as strings                              |                                                                                            |
| `supportedAspectRatios`                                                                    | [models.SupportedAspectRatio](../models/supportedaspectratio.md)[]                         | :heavy_check_mark:                                                                         | Supported output aspect ratios                                                             |                                                                                            |
| `supportedDurations`                                                                       | *number*[]                                                                                 | :heavy_check_mark:                                                                         | Supported video durations in seconds                                                       |                                                                                            |
| `supportedResolutions`                                                                     | [models.SupportedResolution](../models/supportedresolution.md)[]                           | :heavy_check_mark:                                                                         | Supported output resolutions                                                               |                                                                                            |
| `supportedSizes`                                                                           | [models.SupportedSize](../models/supportedsize.md)[]                                       | :heavy_check_mark:                                                                         | Supported output sizes (width x height)                                                    |                                                                                            |