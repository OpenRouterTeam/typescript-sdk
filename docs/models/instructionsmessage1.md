# InstructionsMessage1

## Example Usage

```typescript
import { InstructionsMessage1 } from "@openrouter/sdk/models";

let value: InstructionsMessage1 = {
  type: "message",
  role: "assistant",
  content: [],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `type`                                                                   | [models.InstructionsTypeMessage1](../models/instructionstypemessage1.md) | :heavy_minus_sign:                                                       | N/A                                                                      |
| `role`                                                                   | *models.OpenResponsesNonStreamingResponseRoleUnion1*                     | :heavy_check_mark:                                                       | N/A                                                                      |
| `content`                                                                | *models.OpenResponsesNonStreamingResponseContent2*                       | :heavy_check_mark:                                                       | N/A                                                                      |