# ResponseFormatJSONSchema

JSON Schema response format

## Example Usage

```typescript
import { ResponseFormatJSONSchema } from "@openrouter/sdk/models";

let value: ResponseFormatJSONSchema = {
  type: "json_schema",
  name: "<value>",
  description: "inasmuch shoddy whereas where bitter tragic",
  strict: true,
  schema: {
    "key": "<value>",
    "key1": "<value>",
  },
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                                                           | [models.ResponseFormatJSONSchemaType](../models/responseformatjsonschematype.md) | :heavy_check_mark:                                                               | N/A                                                                              |
| `name`                                                                           | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `description`                                                                    | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |
| `strict`                                                                         | *boolean*                                                                        | :heavy_minus_sign:                                                               | N/A                                                                              |
| `schema`                                                                         | Record<string, *any*>                                                            | :heavy_check_mark:                                                               | N/A                                                                              |