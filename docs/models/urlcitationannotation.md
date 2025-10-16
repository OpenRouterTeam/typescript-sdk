# URLCitationAnnotation

## Example Usage

```typescript
import { URLCitationAnnotation } from "@openrouter/sdk/models";

let value: URLCitationAnnotation = {
  type: "url_citation",
  endIndex: 6805.23,
  startIndex: 5557.95,
  title: "<value>",
  url: "https://fat-gloom.biz",
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `type`                                                                     | [models.URLCitationAnnotationType](../models/urlcitationannotationtype.md) | :heavy_check_mark:                                                         | N/A                                                                        |
| `endIndex`                                                                 | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `startIndex`                                                               | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `title`                                                                    | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `url`                                                                      | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |