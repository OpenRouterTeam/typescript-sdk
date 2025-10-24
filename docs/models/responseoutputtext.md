# ResponseOutputText

## Example Usage

```typescript
import { ResponseOutputText } from "@openrouter/sdk/models";

let value: ResponseOutputText = {
  type: "output_text",
  text: "The capital of France is Paris.",
  annotations: [
    {
      type: "url_citation",
      url: "https://en.wikipedia.org/wiki/Paris",
      title: "Paris - Wikipedia",
      startIndex: 0,
      endIndex: 42,
    },
  ],
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `type`                                                               | [models.ResponseOutputTextType](../models/responseoutputtexttype.md) | :heavy_check_mark:                                                   | N/A                                                                  |
| `text`                                                               | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `annotations`                                                        | *models.OpenAIResponsesAnnotation*[]                                 | :heavy_minus_sign:                                                   | N/A                                                                  |