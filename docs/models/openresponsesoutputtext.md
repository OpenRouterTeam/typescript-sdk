# OpenResponsesOutputText

## Example Usage

```typescript
import { OpenResponsesOutputText } from "@openrouter/sdk/models";

let value: OpenResponsesOutputText = {
  type: "output_text",
  text: "<value>",
  annotations: [
    {
      type: "file_path",
      fileId: "<id>",
      index: 722.68,
    },
  ],
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `type`                                                                         | [models.OpenResponsesOutputTextType](../models/openresponsesoutputtexttype.md) | :heavy_check_mark:                                                             | N/A                                                                            |
| `text`                                                                         | *string*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `annotations`                                                                  | *models.OpenResponsesOutputTextAnnotation*[]                                   | :heavy_minus_sign:                                                             | N/A                                                                            |