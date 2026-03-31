# ChatContentImage

Image content part for vision models

## Example Usage

```typescript
import { ChatContentImage } from "@openrouter/sdk/models";

let value: ChatContentImage = {
  type: "image_url",
  imageUrl: {
    url: "https://vague-assist.org/",
  },
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `type`                                                                   | [models.ChatContentImageType](../models/chatcontentimagetype.md)         | :heavy_check_mark:                                                       | N/A                                                                      |
| `imageUrl`                                                               | [models.ChatContentImageImageUrl](../models/chatcontentimageimageurl.md) | :heavy_check_mark:                                                       | N/A                                                                      |