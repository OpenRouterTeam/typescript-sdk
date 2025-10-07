# Architecture

Model architecture information

## Example Usage

```typescript
import { Architecture } from "@openrouter/sdk/models/operations";

let value: Architecture = {
  tokenizer: "GPT",
  instructType: "chatml",
  modality: "text",
  inputModalities: [
    "text",
    "image",
  ],
  outputModalities: [
    "text",
  ],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `tokenizer`                                                              | [operations.Tokenizer](../../models/operations/tokenizer.md)             | :heavy_check_mark:                                                       | Tokenizer type used by the model                                         | GPT                                                                      |
| `instructType`                                                           | [operations.InstructType](../../models/operations/instructtype.md)       | :heavy_check_mark:                                                       | Instruction format type                                                  | chatml                                                                   |
| `modality`                                                               | *string*                                                                 | :heavy_check_mark:                                                       | Primary modality of the model                                            | text                                                                     |
| `inputModalities`                                                        | [operations.InputModality](../../models/operations/inputmodality.md)[]   | :heavy_check_mark:                                                       | Supported input modalities                                               | [<br/>"text",<br/>"image"<br/>]                                          |
| `outputModalities`                                                       | [operations.OutputModality](../../models/operations/outputmodality.md)[] | :heavy_check_mark:                                                       | Supported output modalities                                              | [<br/>"text"<br/>]                                                       |