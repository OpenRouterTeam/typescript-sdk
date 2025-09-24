# ChatCompletionChunk

## Example Usage

```typescript
import { ChatCompletionChunk } from "@openrouter/sdk/models";

let value: ChatCompletionChunk = {
  data: {
    id: "<id>",
    choices: [
      {
        delta: {},
        finishReason: "content_filter",
        index: 214.57,
      },
    ],
    created: 3939.45,
    model: "Impala",
    object: "chat.completion.chunk",
  },
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `data`                           | [models.Data](../models/data.md) | :heavy_check_mark:               | N/A                              |