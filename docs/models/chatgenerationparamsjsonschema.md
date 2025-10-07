# ChatGenerationParamsJsonSchema

## Example Usage

```typescript
import { ChatGenerationParamsJsonSchema } from "@openrouter/sdk/models";

let value: ChatGenerationParamsJsonSchema = {
  name: "<value>",
  description: "striking elevator inasmuch zowie chip subdued",
  schema: {
    "key": "<value>",
    "key1": "<value>",
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