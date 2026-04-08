# Intent

The routing intent specifying task and optimization constraint

## Example Usage

```typescript
import { Intent } from "@openrouter/sdk/models";

let value: Intent = {
  task: "chat",
  constraint: "fast",
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        | Example                                                                                            |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `task`                                                                                             | [models.Task](../models/task.md)                                                                   | :heavy_check_mark:                                                                                 | The primary use-case category (chat, reasoning, code, creative, image, tts, stt, video, embedding) | chat                                                                                               |
| `constraint`                                                                                       | [models.Constraint](../models/constraint.md)                                                       | :heavy_check_mark:                                                                                 | The optimization axis for routing (fast, smart, latest, high, precise, cheap)                      | fast                                                                                               |
| `tier`                                                                                             | [models.Tier](../models/tier.md)                                                                   | :heavy_minus_sign:                                                                                 | Optional quality/cost tier (free, standard, premium)                                               | standard                                                                                           |