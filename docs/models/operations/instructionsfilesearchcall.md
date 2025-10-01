# InstructionsFileSearchCall

## Example Usage

```typescript
import { InstructionsFileSearchCall } from "@openrouter/sdk/models/operations";

let value: InstructionsFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [],
  status: "in_progress",
};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                 | [operations.InstructionsTypeFileSearchCall](../../models/operations/instructionstypefilesearchcall.md) | :heavy_check_mark:                                                                                     | N/A                                                                                                    |
| `id`                                                                                                   | *string*                                                                                               | :heavy_check_mark:                                                                                     | N/A                                                                                                    |
| `queries`                                                                                              | *string*[]                                                                                             | :heavy_check_mark:                                                                                     | N/A                                                                                                    |
| `status`                                                                                               | [operations.InstructionsStatusEnum5](../../models/operations/instructionsstatusenum5.md)               | :heavy_check_mark:                                                                                     | N/A                                                                                                    |