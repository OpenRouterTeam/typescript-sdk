# FileSearchServerToolConfigFilters2

## Example Usage

```typescript
import { FileSearchServerToolConfigFilters2 } from "@openrouter/sdk/models";

let value: FileSearchServerToolConfigFilters2 = {
  filters: [],
  type: "and",
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            | Example                                                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `filters`                                                                              | Record<string, *any*>[]                                                                | :heavy_check_mark:                                                                     | The filters to combine.                                                                |                                                                                        |
| `type`                                                                                 | [models.FileSearchServerToolConfigType2](../models/filesearchservertoolconfigtype2.md) | :heavy_check_mark:                                                                     | The compound filter operator.                                                          | and                                                                                    |