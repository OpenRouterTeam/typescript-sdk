# ResponsesFormatTextJSONSchemaConfig

JSON schema constrained response format

## Example Usage

```typescript
import { ResponsesFormatTextJSONSchemaConfig } from "@openrouter/sdk/models";

let value: ResponsesFormatTextJSONSchemaConfig = {
  type: "json_schema",
  name: "<value>",
  description: "yet deceivingly between aw compromise wallaby as",
  strict: true,
  schema: {
    "key": "<value>",
    "key1": "<value>",
  },
};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                 | [models.ResponsesFormatTextJSONSchemaConfigType](../models/responsesformattextjsonschemaconfigtype.md) | :heavy_check_mark:                                                                                     | N/A                                                                                                    |
| `name`                                                                                                 | *string*                                                                                               | :heavy_check_mark:                                                                                     | N/A                                                                                                    |
| `description`                                                                                          | *string*                                                                                               | :heavy_minus_sign:                                                                                     | N/A                                                                                                    |
| `strict`                                                                                               | *boolean*                                                                                              | :heavy_minus_sign:                                                                                     | N/A                                                                                                    |
| `schema`                                                                                               | Record<string, *any*>                                                                                  | :heavy_check_mark:                                                                                     | N/A                                                                                                    |