# OpenResponsesEasyInputMessage

## Example Usage

```typescript
import { OpenResponsesEasyInputMessage } from "@openrouter/sdk/models";

let value: OpenResponsesEasyInputMessage = {
  role: "system",
  content: "<value>",
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                   | [models.OpenResponsesEasyInputMessageTypeMessage](../models/openresponseseasyinputmessagetypemessage.md) | :heavy_minus_sign:                                                                                       | N/A                                                                                                      |
| `role`                                                                                                   | *models.OpenResponsesEasyInputMessageRoleUnion*                                                          | :heavy_check_mark:                                                                                       | N/A                                                                                                      |
| `content`                                                                                                | *models.OpenResponsesEasyInputMessageContentUnion2*                                                      | :heavy_check_mark:                                                                                       | N/A                                                                                                      |