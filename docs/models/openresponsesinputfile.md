# OpenResponsesInputFile

File input content item

## Example Usage

```typescript
import { OpenResponsesInputFile } from "@openrouter/sdk/models";

let value: OpenResponsesInputFile = {
  type: "input_file",
  fileId: "<id>",
  fileData: "<value>",
  filename: "example.file",
  fileUrl: "https://secondary-epic.net",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | [models.OpenResponsesInputFileType](../models/openresponsesinputfiletype.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `fileId`                                                                     | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |
| `fileData`                                                                   | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |
| `filename`                                                                   | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |
| `fileUrl`                                                                    | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |