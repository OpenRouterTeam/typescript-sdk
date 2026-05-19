# WebSearchImageResult

Image result returned in `web_search_call.results` when `search_content_types` includes `"image"` and the request opts into `include: ["web_search_call.results"]`.

## Example Usage

```typescript
import { WebSearchImageResult } from "@openrouter/sdk/models";

let value: WebSearchImageResult = {
  imageUrl: "https://example.com/image.jpg",
  sourceWebsiteUrl: "https://example.com/article",
  type: "image_result",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `caption`                                                                | *string*                                                                 | :heavy_minus_sign:                                                       | N/A                                                                      |
| `imageUrl`                                                               | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `sourceWebsiteUrl`                                                       | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `thumbnailUrl`                                                           | *string*                                                                 | :heavy_minus_sign:                                                       | N/A                                                                      |
| `type`                                                                   | [models.WebSearchImageResultType](../models/websearchimageresulttype.md) | :heavy_check_mark:                                                       | N/A                                                                      |