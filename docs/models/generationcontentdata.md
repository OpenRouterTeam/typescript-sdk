# GenerationContentData

Stored prompt and completion content

## Example Usage

```typescript
import { GenerationContentData } from "@openrouter/sdk/models";

let value: GenerationContentData = {
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
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `input`                                                                        | *models.InputUnion*                                                            | :heavy_check_mark:                                                             | The input to the generation — either a prompt string or an array of messages   |
| `output`                                                                       | [models.GenerationContentDataOutput](../models/generationcontentdataoutput.md) | :heavy_check_mark:                                                             | The output from the generation                                                 |