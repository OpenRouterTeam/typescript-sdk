# OutputAudio

An audio output content part inside an assistant message.

## Example Usage

```typescript
import { OutputAudio } from "@openrouter/sdk/models";

let value: OutputAudio = {
  data: "UklGRnoGAABXQVZFZm10IBAAAAABAAEA",
  transcript: "Hello! How can I help you today?",
  type: "output_audio",
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `data`                                                    | *string*                                                  | :heavy_check_mark:                                        | Base64-encoded audio bytes returned by the model.         |
| `expiresAt`                                               | *number*                                                  | :heavy_minus_sign:                                        | Unix timestamp (seconds) at which the audio data expires. |
| `id`                                                      | *string*                                                  | :heavy_minus_sign:                                        | Provider-assigned audio identifier (when available).      |
| `transcript`                                              | *string*                                                  | :heavy_check_mark:                                        | Text transcript of the audio output.                      |
| `type`                                                    | *"output_audio"*                                          | :heavy_check_mark:                                        | N/A                                                       |