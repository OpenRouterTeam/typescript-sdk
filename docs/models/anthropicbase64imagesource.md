# AnthropicBase64ImageSource

## Example Usage

```typescript
import { AnthropicBase64ImageSource } from "@openrouter/sdk/models";

let value: AnthropicBase64ImageSource = {
  data: "/9j/4AAQ...",
  mediaType: "image/jpeg",
  type: "base64",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          | Example                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `data`                                                               | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |
| `mediaType`                                                          | [models.AnthropicImageMimeType](../models/anthropicimagemimetype.md) | :heavy_check_mark:                                                   | N/A                                                                  | image/jpeg                                                           |
| `type`                                                               | *"base64"*                                                           | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |