# OpenResponsesOutputText

## Example Usage

```typescript
import { OpenResponsesOutputText } from "@openrouter/sdk/models";

let value: OpenResponsesOutputText = {
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

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `type`                                                                         | [models.OpenResponsesOutputTextType](../models/openresponsesoutputtexttype.md) | :heavy_check_mark:                                                             | N/A                                                                            |
| `text`                                                                         | *string*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `annotations`                                                                  | *models.OpenResponsesOutputTextAnnotation*[]                                   | :heavy_minus_sign:                                                             | N/A                                                                            |