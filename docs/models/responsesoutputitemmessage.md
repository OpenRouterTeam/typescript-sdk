# ResponsesOutputItemMessage

## Example Usage

```typescript
import { ResponsesOutputItemMessage } from "@openrouter/sdk/models";

let value: ResponsesOutputItemMessage = {
  id: "<id>",
  role: "assistant",
  type: "message",
  status: "in_progress",
  content: [],
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `id`                                                                                 | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `role`                                                                               | [models.ResponsesOutputItemRole](../models/responsesoutputitemrole.md)               | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `type`                                                                               | [models.ResponsesOutputItemTypeMessage](../models/responsesoutputitemtypemessage.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `status`                                                                             | *models.ResponsesOutputItemStatusUnion*                                              | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `content`                                                                            | *models.ResponsesOutputItemContent*[]                                                | :heavy_check_mark:                                                                   | N/A                                                                                  |