# OpenResponsesDebugEvent

OpenRouter debug event emitted when streaming debug options are enabled

## Example Usage

```typescript
import { OpenResponsesDebugEvent } from "@openrouter/sdk/models";

let value: OpenResponsesDebugEvent = {
  debug: {},
  sequenceNumber: 0,
  type: "response.debug",
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `debug`                            | [models.Debug](../models/debug.md) | :heavy_check_mark:                 | N/A                                |
| `sequenceNumber`                   | *number*                           | :heavy_check_mark:                 | N/A                                |
| `type`                             | *"response.debug"*                 | :heavy_check_mark:                 | N/A                                |