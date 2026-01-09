# ResponsesFormatTextJSONSchemaConfig

JSON schema constrained response format

## Example Usage

```typescript
import { ResponsesFormatTextJSONSchemaConfig } from "@openrouter/sdk/models";

let value: ResponsesFormatTextJSONSchemaConfig = {
  type: "json_schema",
  name: "<value>",
  schema: {
    "key": "<value>",
    "key1": "<value>",
  },
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `type`                | *"json_schema"*       | :heavy_check_mark:    | N/A                   |
| `name`                | *string*              | :heavy_check_mark:    | N/A                   |
| `description`         | *string*              | :heavy_minus_sign:    | N/A                   |
| `strict`              | *boolean*             | :heavy_minus_sign:    | N/A                   |
| `schema`              | Record<string, *any*> | :heavy_check_mark:    | N/A                   |