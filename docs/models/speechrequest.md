# SpeechRequest

Text-to-speech request input

## Example Usage

```typescript
import { SpeechRequest } from "@openrouter/sdk/models";

let value: SpeechRequest = {
  input: "Hello world",
  model: "elevenlabs/eleven-turbo-v2",
  voice: "alloy",
};
```

## Fields

| Field                                                                                                         | Type                                                                                                          | Required                                                                                                      | Description                                                                                                   | Example                                                                                                       |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `input`                                                                                                       | *string*                                                                                                      | :heavy_check_mark:                                                                                            | Text to synthesize                                                                                            | Hello world                                                                                                   |
| `model`                                                                                                       | *string*                                                                                                      | :heavy_check_mark:                                                                                            | TTS model identifier                                                                                          | elevenlabs/eleven-turbo-v2                                                                                    |
| `provider`                                                                                                    | [models.SpeechRequestProvider](../models/speechrequestprovider.md)                                            | :heavy_minus_sign:                                                                                            | Provider-specific passthrough configuration                                                                   |                                                                                                               |
| `responseFormat`                                                                                              | [models.ResponseFormatEnum](../models/responseformatenum.md)                                                  | :heavy_minus_sign:                                                                                            | Audio output format                                                                                           | pcm                                                                                                           |
| `speed`                                                                                                       | *number*                                                                                                      | :heavy_minus_sign:                                                                                            | Playback speed multiplier. Only used by models that support it (e.g. OpenAI TTS). Ignored by other providers. | 1                                                                                                             |
| `voice`                                                                                                       | *string*                                                                                                      | :heavy_check_mark:                                                                                            | Voice identifier (provider-specific).                                                                         | alloy                                                                                                         |