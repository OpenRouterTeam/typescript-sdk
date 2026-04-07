# ChatRequestIntent

The routing intent specifying task and optimization constraint

## Example Usage

```typescript
import { ChatRequestIntent } from "@openrouter/sdk/models";

let value: ChatRequestIntent = {
  task: "chat",
  constraint: "fast",
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        | Example                                                                                            |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `task`                                                                                             | [models.ChatRequestTask](../models/chatrequesttask.md)                                             | :heavy_check_mark:                                                                                 | The primary use-case category (chat, reasoning, code, creative, image, tts, stt, video, embedding) | chat                                                                                               |
| `constraint`                                                                                       | [models.ChatRequestConstraint](../models/chatrequestconstraint.md)                                 | :heavy_check_mark:                                                                                 | The optimization axis for routing (fast, smart, latest, high, precise, cheap)                      | fast                                                                                               |
| `tier`                                                                                             | [models.ChatRequestTier](../models/chatrequesttier.md)                                             | :heavy_minus_sign:                                                                                 | Optional quality/cost tier (free, standard, premium)                                               | standard                                                                                           |