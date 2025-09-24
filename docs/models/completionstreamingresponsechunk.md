# CompletionStreamingResponseChunk

## Example Usage

```typescript
import { CompletionStreamingResponseChunk } from "@openrouter/sdk/models";

let value: CompletionStreamingResponseChunk = {
  data: {
    id: "<id>",
    object: "text_completion.chunk",
    created: 7698.26,
    model: "Malibu",
    choices: [
      {
        text: "<value>",
        index: 640.94,
        logprobs: {
          tokens: [
            "<value 1>",
          ],
          tokenLogprobs: [
            7640.5,
            1771.28,
          ],
          topLogprobs: [],
          textOffset: [
            3937.38,
            9605.77,
          ],
        },
        finishReason: "length",
      },
    ],
  },
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `data`                                                                                           | [models.CompletionStreamingResponseChunkData](../models/completionstreamingresponsechunkdata.md) | :heavy_check_mark:                                                                               | N/A                                                                                              |