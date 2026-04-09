# ChatContentImage

Image content part for vision models

## Example Usage

```typescript
import { ChatContentImage } from "@openrouter/sdk/models";

let value: ChatContentImage = {
  imageUrl: {
    url: "https://vague-assist.org/",
  },
  type: "image_url",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `imageUrl`                                                               | [models.ChatContentImageImageUrl](../models/chatcontentimageimageurl.md) | :heavy_check_mark:                                                       | N/A                                                                      |
| `type`                                                                   | *"image_url"*                                                            | :heavy_check_mark:                                                       | N/A                                                                      |