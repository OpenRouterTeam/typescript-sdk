# ChatCompletionContentPartImage

## Example Usage

```typescript
import { ChatCompletionContentPartImage } from "open-router/models";

let value: ChatCompletionContentPartImage = {
  type: "image_url",
  imageUrl: {
    url: "https://thin-freezing.info/",
  },
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `type`                                   | *string*                                 | :heavy_check_mark:                       | N/A                                      |
| `imageUrl`                               | [models.ImageUrl](../models/imageurl.md) | :heavy_check_mark:                       | N/A                                      |