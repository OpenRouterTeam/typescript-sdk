# OpenResponsesEasyInputMessage

Simplified input message format that accepts string or array content

## Example Usage

```typescript
import { OpenResponsesEasyInputMessage } from "@openrouter/sdk/models";

let value: OpenResponsesEasyInputMessage = {
  type: "message",
  role: "user",
  content: "What is the weather today?",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `type`                                                                                     | [models.OpenResponsesEasyInputMessageType](../models/openresponseseasyinputmessagetype.md) | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `role`                                                                                     | *models.OpenResponsesEasyInputMessageRoleUnion*                                            | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `content`                                                                                  | *models.OpenResponsesEasyInputMessageContent*                                              | :heavy_check_mark:                                                                         | N/A                                                                                        |