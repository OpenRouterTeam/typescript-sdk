# AudioDoneEvent

Audio output streaming complete.

## Example Usage

```typescript
import { AudioDoneEvent } from "@openrouter/sdk/models";

let value: AudioDoneEvent = {
  sequenceNumber: 0,
  type: "response.audio.done",
};
```

## Fields

| Field                   | Type                    | Required                | Description             |
| ----------------------- | ----------------------- | ----------------------- | ----------------------- |
| `sequenceNumber`        | *number*                | :heavy_check_mark:      | N/A                     |
| `type`                  | *"response.audio.done"* | :heavy_check_mark:      | N/A                     |