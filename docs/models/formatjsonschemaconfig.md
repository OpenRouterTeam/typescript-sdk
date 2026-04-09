# FormatJsonSchemaConfig

JSON schema constrained response format

## Example Usage

```typescript
import { FormatJsonSchemaConfig } from "@openrouter/sdk/models";

let value: FormatJsonSchemaConfig = {
  name: "<value>",
  schema: {
    "key": "<value>",
  },
  type: "json_schema",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `description`         | *string*              | :heavy_minus_sign:    | N/A                   |
| `name`                | *string*              | :heavy_check_mark:    | N/A                   |
| `schema`              | Record<string, *any*> | :heavy_check_mark:    | N/A                   |
| `strict`              | *boolean*             | :heavy_minus_sign:    | N/A                   |
| `type`                | *"json_schema"*       | :heavy_check_mark:    | N/A                   |