# ChatStreamChunkUsage

Token usage statistics

## Example Usage

```typescript
import { ChatStreamChunkUsage } from "@openrouter/sdk/models";

let value: ChatStreamChunkUsage = {
  completionTokens: 15,
  promptTokens: 10,
  totalTokens: 25,
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `completionTokens`                                                                                   | *number*                                                                                             | :heavy_check_mark:                                                                                   | Number of tokens in the completion                                                                   |
| `promptTokens`                                                                                       | *number*                                                                                             | :heavy_check_mark:                                                                                   | Number of tokens in the prompt                                                                       |
| `totalTokens`                                                                                        | *number*                                                                                             | :heavy_check_mark:                                                                                   | Total number of tokens                                                                               |
| `completionTokensDetails`                                                                            | [models.ChatStreamChunkCompletionTokensDetails](../models/chatstreamchunkcompletiontokensdetails.md) | :heavy_minus_sign:                                                                                   | Detailed completion token usage                                                                      |
| `promptTokensDetails`                                                                                | [models.ChatStreamChunkPromptTokensDetails](../models/chatstreamchunkprompttokensdetails.md)         | :heavy_minus_sign:                                                                                   | Detailed prompt token usage                                                                          |