# STTInputAudio

Base64-encoded audio to transcribe

## Example Usage

```typescript
import { STTInputAudio } from "@openrouter/sdk/models";

let value: STTInputAudio = {
  data: "UklGRiQA...",
  format: "wav",
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `data`                                                                                        | *string*                                                                                      | :heavy_check_mark:                                                                            | Base64-encoded audio data (raw bytes, not a data URI)                                         |
| `format`                                                                                      | *string*                                                                                      | :heavy_check_mark:                                                                            | Audio format (e.g., wav, mp3, flac, m4a, ogg, webm, aac). Supported formats vary by provider. |