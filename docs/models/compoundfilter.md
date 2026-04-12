# CompoundFilter

A compound filter that combines multiple comparison or compound filters

## Example Usage

```typescript
import { CompoundFilter } from "@openrouter/sdk/models";

let value: CompoundFilter = {
  filters: [
    {
      "key": "author",
      "type": "eq",
      "value": "Alice",
    },
  ],
  type: "and",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `filters`                                                    | Record<string, *any*>[]                                      | :heavy_check_mark:                                           | N/A                                                          |
| `type`                                                       | [models.CompoundFilterType](../models/compoundfiltertype.md) | :heavy_check_mark:                                           | N/A                                                          |