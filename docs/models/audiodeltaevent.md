# AudioDeltaEvent

A partial chunk of audio output.

## Example Usage

```typescript
import { AudioDeltaEvent } from "@openrouter/sdk/models";

let value: AudioDeltaEvent = {
  delta: "<value>",
  sequenceNumber: 0,
  type: "response.audio.delta",
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `delta`                                | *string*                               | :heavy_check_mark:                     | A chunk of base64-encoded audio bytes. |
| `sequenceNumber`                       | *number*                               | :heavy_check_mark:                     | N/A                                    |
| `type`                                 | *"response.audio.delta"*               | :heavy_check_mark:                     | N/A                                    |