# GenerationContentResponse

Stored prompt and completion content for a generation

## Example Usage

```typescript
import { GenerationContentResponse } from "@openrouter/sdk/models";

let value: GenerationContentResponse = {
  data: {
    input: {
      messages: [
        {
          "content": "What is the meaning of life?",
          "role": "user",
        },
      ],
    },
    output: {
      completion: "The meaning of life is a philosophical question...",
      reasoning: null,
    },
  },
};
```

## Fields

| Field                                                                                                                                                                                               | Type                                                                                                                                                                                                | Required                                                                                                                                                                                            | Description                                                                                                                                                                                         | Example                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                                                                              | [models.GenerationContentData](../models/generationcontentdata.md)                                                                                                                                  | :heavy_check_mark:                                                                                                                                                                                  | Stored prompt and completion content                                                                                                                                                                | {<br/>"input": {<br/>"messages": [<br/>{<br/>"content": "What is the meaning of life?",<br/>"role": "user"<br/>}<br/>]<br/>},<br/>"output": {<br/>"completion": "The meaning of life is a philosophical question...",<br/>"reasoning": null<br/>}<br/>} |