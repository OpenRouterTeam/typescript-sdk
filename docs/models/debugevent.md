# DebugEvent

Debug event emitted when debug.echo_upstream_body is true. Contains the transformed upstream request body or timing milestones.

## Example Usage

```typescript
import { DebugEvent } from "@openrouter/sdk/models";

let value: DebugEvent = {
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