# EditCompact20260112

## Example Usage

```typescript
import { EditCompact20260112 } from "@openrouter/sdk/models";

let value: EditCompact20260112 = {
  type: "compact_20260112",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `instructions`                                               | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `pauseAfterCompaction`                                       | *boolean*                                                    | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `trigger`                                                    | [models.TriggerInputTokens](../models/triggerinputtokens.md) | :heavy_minus_sign:                                           | N/A                                                          | {<br/>"type": "input_tokens",<br/>"value": 100000<br/>}      |
| `type`                                                       | *"compact_20260112"*                                         | :heavy_check_mark:                                           | N/A                                                          |                                                              |