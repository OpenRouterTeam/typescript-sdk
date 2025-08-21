# URLCitationAnnotationDetail

URL citation annotation

## Example Usage

```typescript
import { URLCitationAnnotationDetail } from "open-router/models";

let value: URLCitationAnnotationDetail = {
  type: "url_citation",
  urlCitation: {
    endIndex: 1112.55,
    startIndex: 7522.53,
    title: "<value>",
    url: "https://unruly-remark.com",
  },
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `type`                                                                                 | [models.URLCitationAnnotationDetailType](../models/urlcitationannotationdetailtype.md) | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `urlCitation`                                                                          | [models.UrlCitation](../models/urlcitation.md)                                         | :heavy_check_mark:                                                                     | N/A                                                                                    |