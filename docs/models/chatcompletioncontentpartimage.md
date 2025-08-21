# ChatCompletionContentPartImage

Image content part for vision models

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

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `type`                                                                                               | [models.ChatCompletionContentPartImageType](../models/chatcompletioncontentpartimagetype.md)         | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `imageUrl`                                                                                           | [models.ChatCompletionContentPartImageImageUrl](../models/chatcompletioncontentpartimageimageurl.md) | :heavy_check_mark:                                                                                   | N/A                                                                                                  |