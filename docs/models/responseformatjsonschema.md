# ResponseFormatJSONSchema

## Example Usage

```typescript
import { ResponseFormatJSONSchema } from "@openrouter/sdk/models";

let value: ResponseFormatJSONSchema = {
  type: "json_schema",
  jsonSchema: {
    name: "<value>",
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `type`                                                   | *"json_schema"*                                          | :heavy_check_mark:                                       | N/A                                                      |
| `jsonSchema`                                             | [models.JSONSchemaConfig](../models/jsonschemaconfig.md) | :heavy_check_mark:                                       | N/A                                                      |