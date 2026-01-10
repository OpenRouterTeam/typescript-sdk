# ChatStreamingResponseChunkData

## Example Usage

```typescript
import { ChatStreamingResponseChunkData } from "@openrouter/sdk/models";

let value: ChatStreamingResponseChunkData = {
  id: "<id>",
  choices: [],
  created: 3957.6,
  model: "F-150",
  object: "chat.completion.chunk",
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `id`                                                                                   | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `choices`                                                                              | [models.ChatStreamingChoice](../models/chatstreamingchoice.md)[]                       | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `created`                                                                              | *number*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `model`                                                                                | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `object`                                                                               | *"chat.completion.chunk"*                                                              | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `systemFingerprint`                                                                    | *string*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `error`                                                                                | [models.ChatStreamingResponseChunkError](../models/chatstreamingresponsechunkerror.md) | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `usage`                                                                                | [models.ChatGenerationTokenUsage](../models/chatgenerationtokenusage.md)               | :heavy_minus_sign:                                                                     | N/A                                                                                    |