# ChatMessageContentItemImage

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

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `type`                                   | *string*                                 | :heavy_check_mark:                       | N/A                                      |
| `imageUrl`                               | [models.ImageUrl](../models/imageurl.md) | :heavy_check_mark:                       | N/A                                      |