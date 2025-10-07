# ItemAssistant

## Example Usage

```typescript
import { ItemAssistant } from "@openrouter/sdk/models";

let value: ItemAssistant = {
  type: "message",
  id: "<id>",
  content: [
    {
      type: "output_text",
      text: "The weather today is sunny with a high of 75°F.",
      annotations: [],
    },
  ],
  role: "assistant",
  status: "completed",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `type`                                                                   | [models.ItemTypeMessage1](../models/itemtypemessage1.md)                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `id`                                                                     | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `content`                                                                | [models.ResponsesOutputText](../models/responsesoutputtext.md)[]         | :heavy_check_mark:                                                       | N/A                                                                      |
| `role`                                                                   | [models.ResponsesStreamChunkRole](../models/responsesstreamchunkrole.md) | :heavy_check_mark:                                                       | N/A                                                                      |
| `status`                                                                 | *models.Status*                                                          | :heavy_check_mark:                                                       | N/A                                                                      |