# ImageModelListItem

A single image model in the discovery listing.

## Example Usage

```typescript
import { ImageModelListItem } from "@openrouter/sdk/models";

let value: ImageModelListItem = {
  architecture: {
    inputModalities: [
      "text",
      "image",
    ],
    outputModalities: [
      "image",
    ],
  },
  created: 1692901234,
  description: "A text-to-image model.",
  endpoints: "/api/v1/images/models/bytedance-seed/seedream-4.5/endpoints",
  id: "bytedance-seed/seedream-4.5",
  name: "Seedream 4.5",
  supportedParameters: {
    "resolution": {
      type: "enum",
      values: [
        "1K",
        "2K",
        "4K",
      ],
    },
    "seed": {
      type: "boolean",
    },
  },
  supportsStreaming: false,
};
```

## Fields

| Field                                                                                                                                                                | Type                                                                                                                                                                 | Required                                                                                                                                                             | Description                                                                                                                                                          | Example                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `architecture`                                                                                                                                                       | [models.ImageModelArchitecture](../models/imagemodelarchitecture.md)                                                                                                 | :heavy_check_mark:                                                                                                                                                   | N/A                                                                                                                                                                  | {<br/>"input_modalities": [<br/>"text",<br/>"image"<br/>],<br/>"output_modalities": [<br/>"image"<br/>]<br/>}                                                        |
| `created`                                                                                                                                                            | *number*                                                                                                                                                             | :heavy_check_mark:                                                                                                                                                   | Unix timestamp (seconds) of when the model was created                                                                                                               | 1692901234                                                                                                                                                           |
| `description`                                                                                                                                                        | *string*                                                                                                                                                             | :heavy_check_mark:                                                                                                                                                   | N/A                                                                                                                                                                  | A text-to-image model.                                                                                                                                               |
| `endpoints`                                                                                                                                                          | *string*                                                                                                                                                             | :heavy_check_mark:                                                                                                                                                   | Relative URL to the full per-endpoint records for this model                                                                                                         | /api/v1/images/models/bytedance-seed/seedream-4.5/endpoints                                                                                                          |
| `id`                                                                                                                                                                 | *string*                                                                                                                                                             | :heavy_check_mark:                                                                                                                                                   | Model slug                                                                                                                                                           | bytedance-seed/seedream-4.5                                                                                                                                          |
| `name`                                                                                                                                                               | *string*                                                                                                                                                             | :heavy_check_mark:                                                                                                                                                   | Display name                                                                                                                                                         | Seedream 4.5                                                                                                                                                         |
| `supportedParameters`                                                                                                                                                | Record<string, *models.CapabilityDescriptor*>                                                                                                                        | :heavy_check_mark:                                                                                                                                                   | Union of supported parameters across every endpoint of this model. Coarse discovery aid; the definitive per-endpoint set is behind the endpoints URL.                | {<br/>"output_compression": {<br/>"max": 100,<br/>"min": 0,<br/>"type": "range"<br/>},<br/>"resolution": {<br/>"type": "enum",<br/>"values": [<br/>"1K",<br/>"2K",<br/>"4K"<br/>]<br/>},<br/>"seed": {<br/>"type": "boolean"<br/>}<br/>} |
| `supportsStreaming`                                                                                                                                                  | *boolean*                                                                                                                                                            | :heavy_check_mark:                                                                                                                                                   | Whether any endpoint of this model supports native SSE streaming on the dedicated Image API (i.e. `stream: true` in the request). OR across endpoints.               | false                                                                                                                                                                |