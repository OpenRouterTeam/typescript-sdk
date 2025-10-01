# InstructionsContentOutputText2

## Example Usage

```typescript
import { InstructionsContentOutputText2 } from "@openrouter/sdk/models/operations";

let value: InstructionsContentOutputText2 = {
  type: "output_text",
  text: "<value>",
  annotations: [
    {
      type: "file_citation",
      fileId: "<id>",
      filename: "example.file",
      index: 6521.93,
    },
  ],
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `type`                                                                                           | [operations.InstructionsTypeOutputText2](../../models/operations/instructionstypeoutputtext2.md) | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `text`                                                                                           | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `annotations`                                                                                    | *operations.InstructionsAnnotationUnion2*[]                                                      | :heavy_check_mark:                                                                               | N/A                                                                                              |