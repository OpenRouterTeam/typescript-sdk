# JSONSchemaConfig

## Example Usage

```typescript
import { JSONSchemaConfig } from "@openrouter/sdk/models";

let value: JSONSchemaConfig = {
  name: "<value>",
  description: "as adumbrate fishery dependable cemetery instead nifty ah rule",
  schema: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
  strict: false,
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `name`                | *string*              | :heavy_check_mark:    | N/A                   |
| `description`         | *string*              | :heavy_minus_sign:    | N/A                   |
| `schema`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `strict`              | *boolean*             | :heavy_minus_sign:    | N/A                   |