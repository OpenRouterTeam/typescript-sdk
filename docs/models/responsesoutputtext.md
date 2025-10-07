# ResponsesOutputText

Text output with annotations

## Example Usage

```typescript
import { ResponsesOutputText } from "@openrouter/sdk/models";

let value: ResponsesOutputText = {
  type: "output_text",
  text: "The weather today is sunny with a high of 75°F.",
  annotations: [],
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `type`                                                                 | [models.ResponsesOutputTextType](../models/responsesoutputtexttype.md) | :heavy_check_mark:                                                     | N/A                                                                    |
| `text`                                                                 | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `annotations`                                                          | *models.ResponsesAnnotation*[]                                         | :heavy_check_mark:                                                     | N/A                                                                    |