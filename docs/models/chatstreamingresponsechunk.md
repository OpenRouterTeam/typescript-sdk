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
        finishReason: [
          "<value>",
        ],
        index: 3793.72,
      },
    ],
    created: 932.78,
    model: "Ranchero",
    object: "chat.completion.chunk",
  },
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `data`                                                                               | [models.ChatStreamingResponseChunkData](../models/chatstreamingresponsechunkdata.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |