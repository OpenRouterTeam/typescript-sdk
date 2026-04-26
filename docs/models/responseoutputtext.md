# ResponseOutputText

## Example Usage

```typescript
import { ResponseOutputText } from "@openrouter/sdk/models";

let value: ResponseOutputText = {
  text: "The capital of France is Paris.",
  type: "output_text",
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `annotations`                            | *models.Annotation*[]                    | :heavy_minus_sign:                       | N/A                                      |
| `logprobs`                               | [models.Logprob](../models/logprob.md)[] | :heavy_minus_sign:                       | N/A                                      |
| `text`                                   | *string*                                 | :heavy_check_mark:                       | N/A                                      |
| `type`                                   | *"output_text"*                          | :heavy_check_mark:                       | N/A                                      |