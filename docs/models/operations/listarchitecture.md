# ListArchitecture

Model architecture information

## Example Usage

```typescript
import { ListArchitecture } from "@openrouter/sdk/models/operations";

let value: ListArchitecture = {
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

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `tokenizer`                                                                      | [operations.ListTokenizer](../../models/operations/listtokenizer.md)             | :heavy_check_mark:                                                               | Tokenizer type used by the model                                                 | GPT                                                                              |
| `instructType`                                                                   | [operations.ListInstructType](../../models/operations/listinstructtype.md)       | :heavy_check_mark:                                                               | Instruction format type                                                          | chatml                                                                           |
| `modality`                                                                       | *string*                                                                         | :heavy_check_mark:                                                               | Primary modality of the model                                                    | text                                                                             |
| `inputModalities`                                                                | [operations.ListInputModality](../../models/operations/listinputmodality.md)[]   | :heavy_check_mark:                                                               | Supported input modalities                                                       | [<br/>"text",<br/>"image"<br/>]                                                  |
| `outputModalities`                                                               | [operations.ListOutputModality](../../models/operations/listoutputmodality.md)[] | :heavy_check_mark:                                                               | Supported output modalities                                                      | [<br/>"text"<br/>]                                                               |