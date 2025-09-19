# GetModelsArchitecture

Model architecture information

## Example Usage

```typescript
import { GetModelsArchitecture } from "open-router/models/operations";

let value: GetModelsArchitecture = {
  modality: "text",
  inputModalities: [
    "audio",
  ],
  outputModalities: [
    "text",
  ],
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `tokenizer`                                                                                | [operations.GetModelsTokenizer](../../models/operations/getmodelstokenizer.md)             | :heavy_minus_sign:                                                                         | Tokenizer type used by the model                                                           |                                                                                            |
| `instructType`                                                                             | [operations.GetModelsInstructType](../../models/operations/getmodelsinstructtype.md)       | :heavy_minus_sign:                                                                         | Instruction format type                                                                    |                                                                                            |
| `modality`                                                                                 | *string*                                                                                   | :heavy_check_mark:                                                                         | Primary modality of the model                                                              | text                                                                                       |
| `inputModalities`                                                                          | [operations.GetModelsInputModality](../../models/operations/getmodelsinputmodality.md)[]   | :heavy_check_mark:                                                                         | Supported input modalities                                                                 |                                                                                            |
| `outputModalities`                                                                         | [operations.GetModelsOutputModality](../../models/operations/getmodelsoutputmodality.md)[] | :heavy_check_mark:                                                                         | Supported output modalities                                                                |                                                                                            |