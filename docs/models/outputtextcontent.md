# OutputTextContent

## Example Usage

```typescript
import { OutputTextContent } from "@openrouter/sdk/models";

let value: OutputTextContent = {
  type: "output_text",
  text: "The capital of France is Paris.",
  annotations: [
    {
      type: "url_citation",
      endIndex: 42,
      startIndex: 0,
      title: "Paris - Wikipedia",
      url: "https://en.wikipedia.org/wiki/Paris",
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