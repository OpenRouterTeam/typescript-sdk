# ResponseFormatJSONSchema

## Example Usage

```typescript
import { ResponseFormatJSONSchema } from "@openrouter/sdk/models";

let value: ResponseFormatJSONSchema = {
  type: "json_schema",
  jsonSchema: {
    name: "<value>",
    description: "circa or and",
    schema: {
      "key": "<value>",
      "key1": "<value>",
      "key2": "<value>",
    },
    strict: false,
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `type`                                                   | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `jsonSchema`                                             | [models.JSONSchemaConfig](../models/jsonschemaconfig.md) | :heavy_check_mark:                                       | N/A                                                      |