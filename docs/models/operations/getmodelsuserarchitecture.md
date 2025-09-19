# GetModelsUserArchitecture

Model architecture information

## Example Usage

```typescript
import { GetModelsUserArchitecture } from "open-router/models/operations";

let value: GetModelsUserArchitecture = {
  modality: "text",
  inputModalities: [
    "file",
  ],
  outputModalities: [],
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        | Example                                                                                            |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `tokenizer`                                                                                        | [operations.GetModelsUserTokenizer](../../models/operations/getmodelsusertokenizer.md)             | :heavy_minus_sign:                                                                                 | Tokenizer type used by the model                                                                   |                                                                                                    |
| `instructType`                                                                                     | [operations.GetModelsUserInstructType](../../models/operations/getmodelsuserinstructtype.md)       | :heavy_minus_sign:                                                                                 | Instruction format type                                                                            |                                                                                                    |
| `modality`                                                                                         | *string*                                                                                           | :heavy_check_mark:                                                                                 | Primary modality of the model                                                                      | text                                                                                               |
| `inputModalities`                                                                                  | [operations.GetModelsUserInputModality](../../models/operations/getmodelsuserinputmodality.md)[]   | :heavy_check_mark:                                                                                 | Supported input modalities                                                                         |                                                                                                    |
| `outputModalities`                                                                                 | [operations.GetModelsUserOutputModality](../../models/operations/getmodelsuseroutputmodality.md)[] | :heavy_check_mark:                                                                                 | Supported output modalities                                                                        |                                                                                                    |