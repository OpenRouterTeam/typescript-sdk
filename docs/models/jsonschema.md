# JsonSchema

## Example Usage

```typescript
import { JsonSchema } from "open-router/models";

let value: JsonSchema = {
  name: "<value>",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `name`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | Schema name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars)                       |
| `description`                                                                        | *string*                                                                             | :heavy_minus_sign:                                                                   | Schema description for the model                                                     |
| `schema`                                                                             | [models.ResponseFormatJsonSchemaSchema](../models/responseformatjsonschemaschema.md) | :heavy_minus_sign:                                                                   | The schema for the response format, described as a JSON Schema object                |
| `strict`                                                                             | *boolean*                                                                            | :heavy_minus_sign:                                                                   | Enable strict schema adherence                                                       |