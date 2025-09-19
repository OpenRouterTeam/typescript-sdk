# ResponseFormatJSONSchema

## Example Usage

```typescript
import { ResponseFormatJSONSchema } from "open-router/models";

let value: ResponseFormatJSONSchema = {
  type: "json_schema",
  jsonSchema: {
    name: "<value>",
  },
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `type`                                       | *string*                                     | :heavy_check_mark:                           | N/A                                          |
| `jsonSchema`                                 | [models.JsonSchema](../models/jsonschema.md) | :heavy_check_mark:                           | N/A                                          |