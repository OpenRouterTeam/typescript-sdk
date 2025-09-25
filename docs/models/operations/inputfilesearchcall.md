# InputFileSearchCall

## Example Usage

```typescript
import { InputFileSearchCall } from "@openrouter/sdk/models/operations";

let value: InputFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [
    "<value 1>",
  ],
  status: "searching",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `type`                                                                                   | [operations.InputTypeFileSearchCall](../../models/operations/inputtypefilesearchcall.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `id`                                                                                     | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `queries`                                                                                | *string*[]                                                                               | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `status`                                                                                 | [operations.StatusRequestEnum5](../../models/operations/statusrequestenum5.md)           | :heavy_check_mark:                                                                       | N/A                                                                                      |