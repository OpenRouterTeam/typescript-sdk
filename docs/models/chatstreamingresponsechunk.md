# ChatStreamingResponseChunk

## Example Usage

```typescript
import { ChatStreamingResponseChunk } from "@openrouter/sdk/models";

let value: ChatStreamingResponseChunk = {
  data: {
    id: "<id>",
    choices: [
      {
        delta: {},
        finishReason: "content_filter",
        index: 214.57,
      },
    ],
    created: 9352.59,
    model: "Ranchero",
    object: "chat.completion.chunk",
  },
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `data`                           | [models.Data](../models/data.md) | :heavy_check_mark:               | N/A                              |