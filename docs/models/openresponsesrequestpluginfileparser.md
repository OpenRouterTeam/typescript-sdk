# OpenResponsesRequestPluginFileParser

## Example Usage

```typescript
import { OpenResponsesRequestPluginFileParser } from "@openrouter/sdk/models";

let value: OpenResponsesRequestPluginFileParser = {
  id: "file-parser",
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `id`                                                                               | *"file-parser"*                                                                    | :heavy_check_mark:                                                                 | N/A                                                                                |
| `enabled`                                                                          | *boolean*                                                                          | :heavy_minus_sign:                                                                 | Set to false to disable the file-parser plugin for this request. Defaults to true. |
| `maxFiles`                                                                         | *number*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `pdf`                                                                              | [models.OpenResponsesRequestPdf](../models/openresponsesrequestpdf.md)             | :heavy_minus_sign:                                                                 | N/A                                                                                |