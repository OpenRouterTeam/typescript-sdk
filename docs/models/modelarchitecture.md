# ModelArchitecture

Model architecture information

## Example Usage

```typescript
import { ModelArchitecture } from "@openrouter/sdk/models";

let value: ModelArchitecture = {
  inputModalities: [
    "text",
  ],
  instructType: "chatml",
  modality: "text",
  outputModalities: [
    "text",
  ],
  tokenizer: "GPT",
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `inputModalities`                                      | [models.InputModality](../models/inputmodality.md)[]   | :heavy_check_mark:                                     | Supported input modalities                             |                                                        |
| `instructType`                                         | [models.InstructType](../models/instructtype.md)       | :heavy_check_mark:                                     | Instruction format type                                | chatml                                                 |
| `modality`                                             | *string*                                               | :heavy_check_mark:                                     | Primary modality of the model                          | text                                                   |
| `outputModalities`                                     | [models.OutputModality](../models/outputmodality.md)[] | :heavy_check_mark:                                     | Supported output modalities                            |                                                        |
| `tokenizer`                                            | [models.ModelGroup](../models/modelgroup.md)           | :heavy_check_mark:                                     | Tokenizer type used by the model                       | GPT                                                    |