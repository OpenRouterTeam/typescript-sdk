# FormatJSONSchemaRequest

## Example Usage

```typescript
import { FormatJSONSchemaRequest } from "@openrouter/sdk/models/operations";

let value: FormatJSONSchemaRequest = {
  type: "json_schema",
  name: "<value>",
  schema: {
    "key": "<value>",
  },
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `type`                                                                               | [operations.TypeJSONSchemaRequest](../../models/operations/typejsonschemarequest.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `name`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `description`                                                                        | *string*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `strict`                                                                             | *boolean*                                                                            | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `schema`                                                                             | Record<string, *any*>                                                                | :heavy_check_mark:                                                                   | N/A                                                                                  |