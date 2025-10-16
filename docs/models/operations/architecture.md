# Architecture

Model architecture information

## Example Usage

```typescript
import { Architecture } from "@openrouter/sdk/models/operations";

let value: Architecture = {
  tokenizer: null,
  instructType: "mistral",
  modality: "text",
  inputModalities: [
    "file",
  ],
  outputModalities: [],
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `tokenizer`                                                  | [operations.Tokenizer](../../models/operations/tokenizer.md) | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `instructType`                                               | [models.InstructType](../../models/instructtype.md)          | :heavy_check_mark:                                           | Instruction format type                                      |                                                              |
| `modality`                                                   | *string*                                                     | :heavy_check_mark:                                           | Primary modality of the model                                | text                                                         |
| `inputModalities`                                            | [models.InputModality](../../models/inputmodality.md)[]      | :heavy_check_mark:                                           | Supported input modalities                                   |                                                              |
| `outputModalities`                                           | [models.OutputModality](../../models/outputmodality.md)[]    | :heavy_check_mark:                                           | Supported output modalities                                  |                                                              |