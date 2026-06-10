# FileDeleteResponse

Confirmation that a file was deleted.

## Example Usage

```typescript
import { FileDeleteResponse } from "@openrouter/sdk/models";

let value: FileDeleteResponse = {
  id: "file_011CNha8iCJcU1wXNR6q4V8w",
  type: "file_deleted",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `id`                                                                 | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `type`                                                               | [models.FileDeleteResponseType](../models/filedeleteresponsetype.md) | :heavy_check_mark:                                                   | N/A                                                                  |