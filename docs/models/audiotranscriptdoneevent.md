# AudioTranscriptDoneEvent

Audio transcript streaming complete.

## Example Usage

```typescript
import { AudioTranscriptDoneEvent } from "@openrouter/sdk/models";

let value: AudioTranscriptDoneEvent = {
  sequenceNumber: 0,
  type: "response.audio.transcript.done",
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `sequenceNumber`                   | *number*                           | :heavy_check_mark:                 | N/A                                |
| `type`                             | *"response.audio.transcript.done"* | :heavy_check_mark:                 | N/A                                |