# OrderBy

## Example Usage

```typescript
import { OrderBy } from "@openrouter/sdk/models/operations";

let value: OrderBy = {
  direction: "asc",
  field: "request_count",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `direction`                                                  | [operations.Direction](../../models/operations/direction.md) | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `field`                                                      | *string*                                                     | :heavy_check_mark:                                           | Field to order by                                            | request_count                                                |