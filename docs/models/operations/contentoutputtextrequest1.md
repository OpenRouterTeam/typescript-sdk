# ContentOutputTextRequest1

## Example Usage

```typescript
import { ContentOutputTextRequest1 } from "@openrouter/sdk/models/operations";

let value: ContentOutputTextRequest1 = {
  type: "output_text",
  text: "<value>",
  annotations: [],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `type`                                                                             | [operations.InputTypeOutputText1](../../models/operations/inputtypeoutputtext1.md) | :heavy_check_mark:                                                                 | N/A                                                                                |
| `text`                                                                             | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `annotations`                                                                      | *operations.AnnotationRequestUnion1*[]                                             | :heavy_check_mark:                                                                 | N/A                                                                                |