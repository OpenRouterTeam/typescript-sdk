# KeepAliveEvent

OpenRouter extension: heartbeat event sent during long idle periods to prevent SSE connection timeouts.

## Example Usage

```typescript
import { KeepAliveEvent } from "@openrouter/sdk/models";

let value: KeepAliveEvent = {
  type: "response.keep_alive",
};
```

## Fields

| Field                   | Type                    | Required                | Description             |
| ----------------------- | ----------------------- | ----------------------- | ----------------------- |
| `type`                  | *"response.keep_alive"* | :heavy_check_mark:      | N/A                     |