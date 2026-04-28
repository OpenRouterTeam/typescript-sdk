# AudioTranscriptDeltaEvent

A partial chunk of the audio output transcript.

## Example Usage

```typescript
import { AudioTranscriptDeltaEvent } from "@openrouter/sdk/models";

let value: AudioTranscriptDeltaEvent = {
  delta: "<value>",
  sequenceNumber: 0,
  type: "response.audio.transcript.delta",
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `delta`                               | *string*                              | :heavy_check_mark:                    | A chunk of the audio transcript text. |
| `sequenceNumber`                      | *number*                              | :heavy_check_mark:                    | N/A                                   |
| `type`                                | *"response.audio.transcript.delta"*   | :heavy_check_mark:                    | N/A                                   |