# ResponsesRequestIntent

The routing intent specifying task and optimization constraint

## Example Usage

```typescript
import { ResponsesRequestIntent } from "@openrouter/sdk/models";

let value: ResponsesRequestIntent = {
  task: "chat",
  constraint: "fast",
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        | Example                                                                                            |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `task`                                                                                             | *string*                                                                                           | :heavy_check_mark:                                                                                 | The primary use-case category (chat, reasoning, code, creative, image, tts, stt, video, embedding) | chat                                                                                               |
| `constraint`                                                                                       | *string*                                                                                           | :heavy_check_mark:                                                                                 | The optimization axis for routing (fast, smart, latest, high, precise, cheap)                      | fast                                                                                               |
| `tier`                                                                                             | *string*                                                                                           | :heavy_minus_sign:                                                                                 | Optional quality/cost tier (free, standard, premium)                                               | standard                                                                                           |