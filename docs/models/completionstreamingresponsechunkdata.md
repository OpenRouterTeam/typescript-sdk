# CompletionStreamingResponseChunkData

## Example Usage

```typescript
import { CompletionStreamingResponseChunkData } from "@openrouter/sdk/models";

let value: CompletionStreamingResponseChunkData = {
  id: "<id>",
  object: "text_completion.chunk",
  created: 1394.35,
  model: "Silverado",
  choices: [],
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `id`                                                                         | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `object`                                                                     | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `created`                                                                    | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `model`                                                                      | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `systemFingerprint`                                                          | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |
| `choices`                                                                    | [models.CompletionStreamingChoice](../models/completionstreamingchoice.md)[] | :heavy_check_mark:                                                           | N/A                                                                          |
| `usage`                                                                      | [models.CompletionUsage](../models/completionusage.md)                       | :heavy_minus_sign:                                                           | N/A                                                                          |