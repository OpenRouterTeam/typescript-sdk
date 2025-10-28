# ModelArchitecture

Model architecture information

## Example Usage

```typescript
import { ModelArchitecture } from "@openrouter/sdk/models";

let value: ModelArchitecture = {
  tokenizer: "GPT",
  instructType: "chatml",
  modality: "text->text",
  inputModalities: [
    "text",
  ],
  outputModalities: [
    "text",
  ],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        | Example                                                                            |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `tokenizer`                                                                        | [models.ModelGroup](../models/modelgroup.md)                                       | :heavy_minus_sign:                                                                 | Tokenizer type used by the model                                                   | GPT                                                                                |
| `instructType`                                                                     | [models.ModelArchitectureInstructType](../models/modelarchitectureinstructtype.md) | :heavy_minus_sign:                                                                 | Instruction format type                                                            | chatml                                                                             |
| `modality`                                                                         | *string*                                                                           | :heavy_check_mark:                                                                 | Primary modality of the model                                                      | text->text                                                                         |
| `inputModalities`                                                                  | [models.InputModality](../models/inputmodality.md)[]                               | :heavy_check_mark:                                                                 | Supported input modalities                                                         |                                                                                    |
| `outputModalities`                                                                 | [models.OutputModality](../models/outputmodality.md)[]                             | :heavy_check_mark:                                                                 | Supported output modalities                                                        |                                                                                    |