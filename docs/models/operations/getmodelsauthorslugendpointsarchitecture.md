# GetModelsAuthorSlugEndpointsArchitecture

Model architecture information

## Example Usage

```typescript
import { GetModelsAuthorSlugEndpointsArchitecture } from "@openrouter/sdk/models/operations";

let value: GetModelsAuthorSlugEndpointsArchitecture = {
  tokenizer: "GPT",
  instructType: "none",
  modality: "text",
  inputModalities: [],
  outputModalities: [],
};
```

## Fields

| Field                                                                                                                            | Type                                                                                                                             | Required                                                                                                                         | Description                                                                                                                      | Example                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `tokenizer`                                                                                                                      | [operations.GetModelsAuthorSlugEndpointsTokenizer](../../models/operations/getmodelsauthorslugendpointstokenizer.md)             | :heavy_check_mark:                                                                                                               | Tokenizer type used by the model                                                                                                 |                                                                                                                                  |
| `instructType`                                                                                                                   | [operations.GetModelsAuthorSlugEndpointsInstructType](../../models/operations/getmodelsauthorslugendpointsinstructtype.md)       | :heavy_check_mark:                                                                                                               | Instruction format type                                                                                                          |                                                                                                                                  |
| `modality`                                                                                                                       | *string*                                                                                                                         | :heavy_check_mark:                                                                                                               | Primary modality of the model                                                                                                    | text                                                                                                                             |
| `inputModalities`                                                                                                                | [operations.GetModelsAuthorSlugEndpointsInputModality](../../models/operations/getmodelsauthorslugendpointsinputmodality.md)[]   | :heavy_check_mark:                                                                                                               | Supported input modalities                                                                                                       |                                                                                                                                  |
| `outputModalities`                                                                                                               | [operations.GetModelsAuthorSlugEndpointsOutputModality](../../models/operations/getmodelsauthorslugendpointsoutputmodality.md)[] | :heavy_check_mark:                                                                                                               | Supported output modalities                                                                                                      |                                                                                                                                  |