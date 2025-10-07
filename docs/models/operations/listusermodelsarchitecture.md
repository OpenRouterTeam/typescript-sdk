# ListUserModelsArchitecture

Model architecture information

## Example Usage

```typescript
import { ListUserModelsArchitecture } from "@openrouter/sdk/models/operations";

let value: ListUserModelsArchitecture = {
  tokenizer: "Llama3",
  instructType: "phi3",
  modality: "text",
  inputModalities: [
    "file",
  ],
  outputModalities: [],
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          | Example                                                                                              |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `tokenizer`                                                                                          | [operations.ListUserModelsTokenizer](../../models/operations/listusermodelstokenizer.md)             | :heavy_minus_sign:                                                                                   | Tokenizer type used by the model                                                                     |                                                                                                      |
| `instructType`                                                                                       | [operations.ListUserModelsInstructType](../../models/operations/listusermodelsinstructtype.md)       | :heavy_minus_sign:                                                                                   | Instruction format type                                                                              |                                                                                                      |
| `modality`                                                                                           | *string*                                                                                             | :heavy_check_mark:                                                                                   | Primary modality of the model                                                                        | text                                                                                                 |
| `inputModalities`                                                                                    | [operations.ListUserModelsInputModality](../../models/operations/listusermodelsinputmodality.md)[]   | :heavy_check_mark:                                                                                   | Supported input modalities                                                                           |                                                                                                      |
| `outputModalities`                                                                                   | [operations.ListUserModelsOutputModality](../../models/operations/listusermodelsoutputmodality.md)[] | :heavy_check_mark:                                                                                   | Supported output modalities                                                                          |                                                                                                      |