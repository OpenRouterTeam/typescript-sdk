# ToolTypesResponse

List of canonical tool type entries that engines may bind to.

## Example Usage

```typescript
import { ToolTypesResponse } from "@openrouter/sdk/models";

let value: ToolTypesResponse = {
  data: [
    {
      description:
        "Returns the current date and time. Optionally accepts a timezone in the configuration.",
      displayName: "Datetime",
      fullName: "openrouter:datetime",
      inputSchemaJson:
        "{\"type\":\"object\",\"properties\":{\"timezone\":{\"type\":\"string\",\"description\":\"IANA timezone identifier\"}}}",
      supportsNativePassthrough: false,
    },
  ],
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `data`                                                   | [models.ToolTypeSummary](../models/tooltypesummary.md)[] | :heavy_check_mark:                                       | N/A                                                      |