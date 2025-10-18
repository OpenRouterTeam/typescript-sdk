# URLCitation

## Example Usage

```typescript
import { URLCitation } from "@openrouter/sdk/models";

let value: URLCitation = {
  type: "url_citation",
  endIndex: 42,
  startIndex: 0,
  title: "OpenRouter Documentation",
  url: "https://openrouter.ai/docs",
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `type`                                                 | [models.URLCitationType](../models/urlcitationtype.md) | :heavy_check_mark:                                     | N/A                                                    |
| `endIndex`                                             | *number*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `startIndex`                                           | *number*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `title`                                                | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `url`                                                  | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |