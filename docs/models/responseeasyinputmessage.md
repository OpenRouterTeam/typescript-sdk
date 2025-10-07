# ResponseEasyInputMessage

Simple input message format

## Example Usage

```typescript
import { ResponseEasyInputMessage } from "@openrouter/sdk/models";

let value: ResponseEasyInputMessage = {
  type: "message",
  role: "user",
  content: "Hello, how can I help you today?",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                                                           | [models.ResponseEasyInputMessageType](../models/responseeasyinputmessagetype.md) | :heavy_minus_sign:                                                               | N/A                                                                              |                                                                                  |
| `role`                                                                           | *models.ResponseInputMessageRole*                                                | :heavy_check_mark:                                                               | N/A                                                                              | user                                                                             |
| `content`                                                                        | *models.ResponseInputMessageContentUnion*                                        | :heavy_check_mark:                                                               | N/A                                                                              | Hello, how can I help you today?                                                 |