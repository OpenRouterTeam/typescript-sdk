# AudioInputInputAudio

## Example Usage

```typescript
import { AudioInputInputAudio } from "@openrouter/sdk/models";

let value: AudioInputInputAudio = {
  data: "<value>",
  format: "<value>",
};
```

## Fields

| Field                                                         | Type                                                          | Required                                                      | Description                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `data`                                                        | *string*                                                      | :heavy_check_mark:                                            | Base64-encoded audio data or a URL pointing to the audio file |
| `format`                                                      | *string*                                                      | :heavy_check_mark:                                            | Audio format (e.g., mp3, wav, flac, ogg, aac)                 |