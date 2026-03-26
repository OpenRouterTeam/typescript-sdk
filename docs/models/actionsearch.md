# ActionSearch

## Example Usage

```typescript
import { ActionSearch } from "@openrouter/sdk/models";

let value: ActionSearch = {
  type: "search",
  query: "<value>",
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `type`                                 | *"search"*                             | :heavy_check_mark:                     | N/A                                    |
| `query`                                | *string*                               | :heavy_check_mark:                     | N/A                                    |
| `queries`                              | *string*[]                             | :heavy_minus_sign:                     | N/A                                    |
| `sources`                              | [models.Source](../models/source.md)[] | :heavy_minus_sign:                     | N/A                                    |