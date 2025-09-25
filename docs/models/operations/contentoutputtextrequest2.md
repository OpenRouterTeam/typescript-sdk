# ContentOutputTextRequest2

## Example Usage

```typescript
import { ContentOutputTextRequest2 } from "@openrouter/sdk/models/operations";

let value: ContentOutputTextRequest2 = {
  type: "output_text",
  text: "<value>",
  annotations: [
    {
      type: "file_path",
      fileId: "<id>",
      index: 6313.94,
    },
  ],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `type`                                                                             | [operations.InputTypeOutputText2](../../models/operations/inputtypeoutputtext2.md) | :heavy_check_mark:                                                                 | N/A                                                                                |
| `text`                                                                             | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `annotations`                                                                      | *operations.AnnotationRequestUnion2*[]                                             | :heavy_check_mark:                                                                 | N/A                                                                                |