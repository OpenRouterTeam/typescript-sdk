# TaskClassificationMacroCategory

## Example Usage

```typescript
import { TaskClassificationMacroCategory } from "@openrouter/sdk/models";

let value: TaskClassificationMacroCategory = {
  key: "code",
  label: "Code",
  tokenShare: 0.52,
  usageShare: 0.45,
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               | Example                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `key`                                                                     | *string*                                                                  | :heavy_check_mark:                                                        | Macro-category identifier.                                                | code                                                                      |
| `label`                                                                   | *string*                                                                  | :heavy_check_mark:                                                        | Human-readable label for the macro-category.                              | Code                                                                      |
| `tokenShare`                                                              | *number*                                                                  | :heavy_check_mark:                                                        | Combined token share of all classifications in this macro-category (0–1). | 0.52                                                                      |
| `usageShare`                                                              | *number*                                                                  | :heavy_check_mark:                                                        | Combined usage share of all classifications in this macro-category (0–1). | 0.45                                                                      |