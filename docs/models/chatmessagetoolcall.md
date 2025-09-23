# ChatMessageToolCall

## Example Usage

```typescript
import { ChatMessageToolCall } from "@openrouter/sdk/models";

let value: ChatMessageToolCall = {
  id: "<id>",
  type: "function",
  function: {
    name: "<value>",
    arguments: "<value>",
  },
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `id`                                                                           | *string*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `type`                                                                         | *string*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `function`                                                                     | [models.ChatMessageToolCallFunction](../models/chatmessagetoolcallfunction.md) | :heavy_check_mark:                                                             | N/A                                                                            |