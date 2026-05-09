# Architecture

Model architecture information

## Example Usage

```typescript
import { Architecture } from "@openrouter/sdk/models";

let value: Architecture = {
  inputModalities: [
    "text",
  ],
  instructType: "chatml",
  modality: "text->text",
  outputModalities: [
    "text",
  ],
  tokenizer: "GPT",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `inputModalities`                                          | [models.InputModality](../models/inputmodality.md)[]       | :heavy_check_mark:                                         | Supported input modalities                                 |                                                            |
| `instructType`                                             | [models.ModelInstructType](../models/modelinstructtype.md) | :heavy_check_mark:                                         | Instruction format type                                    | chatml                                                     |
| `modality`                                                 | *string*                                                   | :heavy_check_mark:                                         | Primary modality of the model                              | text->text                                                 |
| `outputModalities`                                         | [models.OutputModality](../models/outputmodality.md)[]     | :heavy_check_mark:                                         | Supported output modalities                                |                                                            |
| `tokenizer`                                                | [models.ModelGroup](../models/modelgroup.md)               | :heavy_check_mark:                                         | Tokenizer type used by the model                           | GPT                                                        |