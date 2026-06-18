# Filter

## Example Usage

```typescript
import { Filter } from "@openrouter/sdk/models/operations";

let value: Filter = {
  field: "model",
  operator: "eq",
  value: 4211.9,
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `field`                                              | *string*                                             | :heavy_check_mark:                                   | Dimension to filter on                               | model                                                |
| `operator`                                           | *string*                                             | :heavy_check_mark:                                   | Filter operator                                      | eq                                                   |
| `value`                                              | *operations.Value1*                                  | :heavy_check_mark:                                   | Filter value (scalar or array depending on operator) |                                                      |