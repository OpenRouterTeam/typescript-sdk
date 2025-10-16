# ModelArchitecture

Model architecture information

## Example Usage

```typescript
import { ModelArchitecture } from "@openrouter/sdk/models";

let value: ModelArchitecture = {
  tokenizer: "PaLM",
  instructType: "nemotron",
  modality: "text",
  inputModalities: [
    "image",
  ],
  outputModalities: [
    "embeddings",
  ],
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `tokenizer`                                            | [models.ModelGroup](../models/modelgroup.md)           | :heavy_minus_sign:                                     | Tokenizer type used by the model                       |                                                        |
| `instructType`                                         | [models.InstructType](../models/instructtype.md)       | :heavy_minus_sign:                                     | Instruction format type                                |                                                        |
| `modality`                                             | *string*                                               | :heavy_check_mark:                                     | Primary modality of the model                          | text                                                   |
| `inputModalities`                                      | [models.InputModality](../models/inputmodality.md)[]   | :heavy_check_mark:                                     | Supported input modalities                             |                                                        |
| `outputModalities`                                     | [models.OutputModality](../models/outputmodality.md)[] | :heavy_check_mark:                                     | Supported output modalities                            |                                                        |