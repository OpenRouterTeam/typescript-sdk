# Operator

## Example Usage

```typescript
import { Operator } from "@openrouter/sdk/models/operations";

let value: Operator = {
  name: "eq",
  valueType: "array",
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        | Example                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `name`                                                             | [operations.OperatorName](../../models/operations/operatorname.md) | :heavy_check_mark:                                                 | Operator identifier used in filter definitions                     | eq                                                                 |
| `valueType`                                                        | [operations.ValueType](../../models/operations/valuetype.md)       | :heavy_check_mark:                                                 | Whether the operator expects a single value or an array            |                                                                    |