# PluginFileParser

## Example Usage

```typescript
import { PluginFileParser } from "@openrouter/sdk/models";

let value: PluginFileParser = {
  id: "file-parser",
  maxFiles: 5518.4,
  pdf: {
    engine: "mistral-ocr",
  },
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `id`                                             | [models.IdFileParser](../models/idfileparser.md) | :heavy_check_mark:                               | N/A                                              |
| `maxFiles`                                       | *number*                                         | :heavy_minus_sign:                               | N/A                                              |
| `pdf`                                            | [models.Pdf](../models/pdf.md)                   | :heavy_minus_sign:                               | N/A                                              |