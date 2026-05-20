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
      fullName: "openrouter:datetime",
    },
  ],
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `data`                                                               | [models.ToolTypesResponseData](../models/tooltypesresponsedata.md)[] | :heavy_check_mark:                                                   | N/A                                                                  |