# ImageModelArchitecture

## Example Usage

```typescript
import { ImageModelArchitecture } from "@openrouter/sdk/models";

let value: ImageModelArchitecture = {
  inputModalities: [
    "text",
    "image",
  ],
  outputModalities: [
    "image",
  ],
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `inputModalities`                                                | [models.InputModality](../models/inputmodality.md)[]             | :heavy_check_mark:                                               | Supported input modalities                                       |
| `outputModalities`                                               | [models.ImageOutputModality](../models/imageoutputmodality.md)[] | :heavy_check_mark:                                               | Supported output modalities                                      |