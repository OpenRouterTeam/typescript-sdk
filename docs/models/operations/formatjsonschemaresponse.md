# FormatJSONSchemaResponse

## Example Usage

```typescript
import { FormatJSONSchemaResponse } from "@openrouter/sdk/models/operations";

let value: FormatJSONSchemaResponse = {
  type: "json_schema",
  name: "<value>",
  schema: {},
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `type`                                                                                 | [operations.TypeJSONSchemaResponse](../../models/operations/typejsonschemaresponse.md) | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `name`                                                                                 | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `description`                                                                          | *string*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `strict`                                                                               | *boolean*                                                                              | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `schema`                                                                               | Record<string, *any*>                                                                  | :heavy_check_mark:                                                                     | N/A                                                                                    |