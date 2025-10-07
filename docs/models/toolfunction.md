# ToolFunction

## Example Usage

```typescript
import { ToolFunction } from "@openrouter/sdk/models";

let value: ToolFunction = {
  name: "<value>",
  description: "culminate whereas ick",
  parameters: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
  strict: null,
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `name`                | *string*              | :heavy_check_mark:    | N/A                   |
| `description`         | *string*              | :heavy_minus_sign:    | N/A                   |
| `parameters`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `strict`              | *boolean*             | :heavy_minus_sign:    | N/A                   |