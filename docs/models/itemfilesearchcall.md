# ItemFileSearchCall

## Example Usage

```typescript
import { ItemFileSearchCall } from "@openrouter/sdk/models";

let value: ItemFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [
    "<value 1>",
    "<value 2>",
  ],
  status: "searching",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `type`                                                               | [models.ItemTypeFileSearchCall](../models/itemtypefilesearchcall.md) | :heavy_check_mark:                                                   | N/A                                                                  |
| `id`                                                                 | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `queries`                                                            | *string*[]                                                           | :heavy_check_mark:                                                   | N/A                                                                  |
| `status`                                                             | [models.ItemStatusEnum2](../models/itemstatusenum2.md)               | :heavy_check_mark:                                                   | N/A                                                                  |