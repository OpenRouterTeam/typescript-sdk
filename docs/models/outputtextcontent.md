# OutputTextContent

## Example Usage

```typescript
import { OutputTextContent } from "@openrouter/sdk/models";

let value: OutputTextContent = {
  type: "output_text",
  text: "<value>",
  annotations: [
    {
      type: "file_path",
      fileId: "<id>",
      index: 722.68,
    },
  ],
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `type`                                                             | [models.OutputTextContentType](../models/outputtextcontenttype.md) | :heavy_check_mark:                                                 | N/A                                                                |
| `text`                                                             | *string*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `annotations`                                                      | *models.OutputTextContentAnnotation*[]                             | :heavy_minus_sign:                                                 | N/A                                                                |