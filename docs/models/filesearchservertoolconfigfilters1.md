# FileSearchServerToolConfigFilters1

## Example Usage

```typescript
import { FileSearchServerToolConfigFilters1 } from "@openrouter/sdk/models";

let value: FileSearchServerToolConfigFilters1 = {
  key: "author",
  type: "eq",
  value: "Alice",
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            | Example                                                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `key`                                                                                  | *string*                                                                               | :heavy_check_mark:                                                                     | The key to filter on.                                                                  | author                                                                                 |
| `type`                                                                                 | [models.FileSearchServerToolConfigType1](../models/filesearchservertoolconfigtype1.md) | :heavy_check_mark:                                                                     | The comparison operator.                                                               | eq                                                                                     |
| `value`                                                                                | *models.FileSearchServerToolConfigValue2*                                              | :heavy_check_mark:                                                                     | The value to compare against.                                                          | Alice                                                                                  |