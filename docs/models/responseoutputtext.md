# ResponseOutputText

## Example Usage

```typescript
import { ResponseOutputText } from "@openrouter/sdk/models";

let value: ResponseOutputText = {
  type: "output_text",
  text: "The capital of France is Paris.",
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `type`                               | *"output_text"*                      | :heavy_check_mark:                   | N/A                                  |
| `text`                               | *string*                             | :heavy_check_mark:                   | N/A                                  |
| `annotations`                        | *models.OpenAIResponsesAnnotation*[] | :heavy_minus_sign:                   | N/A                                  |