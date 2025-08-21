# ChatCompletionCreateParamsReasoning

Reasoning configuration

## Example Usage

```typescript
import { ChatCompletionCreateParamsReasoning } from "open-router/models";

let value: ChatCompletionCreateParamsReasoning = {};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `enabled`                                                                                | *boolean*                                                                                | :heavy_minus_sign:                                                                       | Enables reasoning with default settings. Only work for some models.                      |
| `effort`                                                                                 | [models.ChatCompletionCreateParamsEffort](../models/chatcompletioncreateparamseffort.md) | :heavy_minus_sign:                                                                       | OpenAI-style reasoning effort setting                                                    |
| `maxTokens`                                                                              | *number*                                                                                 | :heavy_minus_sign:                                                                       | non-OpenAI-style reasoning effort setting                                                |
| `exclude`                                                                                | *boolean*                                                                                | :heavy_minus_sign:                                                                       | N/A                                                                                      |