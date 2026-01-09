# ChatMessageContentItemImage

## Example Usage

```typescript
import { ChatMessageContentItemImage } from "@openrouter/sdk/models";

let value: ChatMessageContentItemImage = {
  type: "image_url",
  imageUrl: {
    url: "https://pretty-reservation.org",
  },
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `type`                                   | *"image_url"*                            | :heavy_check_mark:                       | N/A                                      |
| `imageUrl`                               | [models.ImageUrl](../models/imageurl.md) | :heavy_check_mark:                       | N/A                                      |