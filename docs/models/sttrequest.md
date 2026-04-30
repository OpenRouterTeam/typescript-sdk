# STTRequest

Speech-to-text request input. Accepts a JSON body with input_audio containing base64-encoded audio.

## Example Usage

```typescript
import { STTRequest } from "@openrouter/sdk/models";

let value: STTRequest = {
  inputAudio: {
    data: "UklGRiQA...",
    format: "wav",
  },
  model: "openai/whisper-large-v3",
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           | Example                                                               |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `inputAudio`                                                          | [models.STTInputAudio](../models/sttinputaudio.md)                    | :heavy_check_mark:                                                    | Base64-encoded audio to transcribe                                    | {<br/>"data": "UklGRiQA...",<br/>"format": "wav"<br/>}                |
| `language`                                                            | *string*                                                              | :heavy_minus_sign:                                                    | ISO-639-1 language code (e.g., "en", "ja"). Auto-detected if omitted. | en                                                                    |
| `model`                                                               | *string*                                                              | :heavy_check_mark:                                                    | STT model identifier                                                  | openai/whisper-large-v3                                               |
| `provider`                                                            | [models.STTRequestProvider](../models/sttrequestprovider.md)          | :heavy_minus_sign:                                                    | Provider-specific passthrough configuration                           |                                                                       |
| `temperature`                                                         | *number*                                                              | :heavy_minus_sign:                                                    | Sampling temperature for transcription                                | 0                                                                     |