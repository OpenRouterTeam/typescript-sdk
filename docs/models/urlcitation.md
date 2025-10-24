# URLCitation

## Example Usage

```typescript
import { URLCitation } from "@openrouter/sdk/models";

let value: URLCitation = {
  type: "url_citation",
  url: "https://openrouter.ai/docs",
  title: "OpenRouter Documentation",
  startIndex: 0,
  endIndex: 42,
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `type`                                                 | [models.URLCitationType](../models/urlcitationtype.md) | :heavy_check_mark:                                     | N/A                                                    |
| `url`                                                  | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `title`                                                | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `startIndex`                                           | *number*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `endIndex`                                             | *number*                                               | :heavy_check_mark:                                     | N/A                                                    |