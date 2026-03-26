# CompoundFilter

A compound filter that combines multiple comparison or compound filters

## Example Usage

```typescript
import { CompoundFilter } from "@openrouter/sdk/models";

let value: CompoundFilter = {
  type: "or",
  filters: [
    {},
    {
      "key": "<value>",
    },
    {
      "key": "<value>",
      "key1": "<value>",
    },
  ],
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `type`                                                       | [models.CompoundFilterType](../models/compoundfiltertype.md) | :heavy_check_mark:                                           | N/A                                                          |
| `filters`                                                    | Record<string, *any*>[]                                      | :heavy_check_mark:                                           | N/A                                                          |