# ChatMessageContentItemImage

Image content part for vision models

## Example Usage

```typescript
import { ChatMessageContentItemImage } from "@openrouter/sdk/models";

let value: ChatMessageContentItemImage = {
  type: "image_url",
  imageUrl: {
    url: "https://better-nephew.com/",
  },
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [models.ChatMessageContentItemImageType](../models/chatmessagecontentitemimagetype.md)         | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `imageUrl`                                                                                     | [models.ChatMessageContentItemImageImageUrl](../models/chatmessagecontentitemimageimageurl.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |