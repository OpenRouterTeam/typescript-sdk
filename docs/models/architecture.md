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
| `tokenizer`                                            | [models.Tokenizer](../models/tokenizer.md)             | :heavy_check_mark:                                     | N/A                                                    | GPT                                                    |