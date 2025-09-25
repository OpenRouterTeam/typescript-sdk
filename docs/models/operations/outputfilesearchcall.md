# OutputFileSearchCall

## Example Usage

```typescript
import { OutputFileSearchCall } from "@openrouter/sdk/models/operations";

let value: OutputFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [],
  status: "searching",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `type`                                                                                     | [operations.OutputTypeFileSearchCall](../../models/operations/outputtypefilesearchcall.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `queries`                                                                                  | *string*[]                                                                                 | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `status`                                                                                   | [operations.OutputStatusEnum2](../../models/operations/outputstatusenum2.md)               | :heavy_check_mark:                                                                         | N/A                                                                                        |