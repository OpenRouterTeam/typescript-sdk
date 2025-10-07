# ListModelsArchitecture

Model architecture information

## Example Usage

```typescript
import { ListModelsArchitecture } from "@openrouter/sdk/models/operations";

let value: ListModelsArchitecture = {
  tokenizer: "Gemini",
  instructType: "nemotron",
  modality: "text",
  inputModalities: [],
  outputModalities: [],
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `tokenizer`                                                                                  | [operations.ListModelsTokenizer](../../models/operations/listmodelstokenizer.md)             | :heavy_minus_sign:                                                                           | Tokenizer type used by the model                                                             |                                                                                              |
| `instructType`                                                                               | [operations.ListModelsInstructType](../../models/operations/listmodelsinstructtype.md)       | :heavy_minus_sign:                                                                           | Instruction format type                                                                      |                                                                                              |
| `modality`                                                                                   | *string*                                                                                     | :heavy_check_mark:                                                                           | Primary modality of the model                                                                | text                                                                                         |
| `inputModalities`                                                                            | [operations.ListModelsInputModality](../../models/operations/listmodelsinputmodality.md)[]   | :heavy_check_mark:                                                                           | Supported input modalities                                                                   |                                                                                              |
| `outputModalities`                                                                           | [operations.ListModelsOutputModality](../../models/operations/listmodelsoutputmodality.md)[] | :heavy_check_mark:                                                                           | Supported output modalities                                                                  |                                                                                              |