# OpenResponsesFormatJSONSchema

JSON schema constrained response format

## Example Usage

```typescript
import { OpenResponsesFormatJSONSchema } from "@openrouter/sdk/models";

let value: OpenResponsesFormatJSONSchema = {
  type: "json_schema",
  name: "<value>",
  description: "forgo till phew phew norm now inside napkin",
  strict: true,
  schema: {},
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `type`                                                                                     | [models.OpenResponsesFormatJSONSchemaType](../models/openresponsesformatjsonschematype.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `name`                                                                                     | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `description`                                                                              | *string*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `strict`                                                                                   | *boolean*                                                                                  | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `schema`                                                                                   | Record<string, *any*>                                                                      | :heavy_check_mark:                                                                         | N/A                                                                                        |