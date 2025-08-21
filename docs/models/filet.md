# FileT

## Example Usage

```typescript
import { FileT } from "open-router/models";

let value: FileT = {
  hash: "<value>",
  content: [
    {
      type: "image_url",
      imageUrl: {
        url: "https://zealous-march.biz/",
      },
    },
  ],
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `hash`                                      | *string*                                    | :heavy_check_mark:                          | N/A                                         |
| `name`                                      | *string*                                    | :heavy_minus_sign:                          | N/A                                         |
| `content`                                   | *models.FileAnnotationDetailContentUnion*[] | :heavy_check_mark:                          | N/A                                         |