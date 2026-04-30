# CreateAudioTranscriptionsRequest

## Example Usage

```typescript
import { CreateAudioTranscriptionsRequest } from "@openrouter/sdk/models/operations";

let value: CreateAudioTranscriptionsRequest = {
  sttRequest: {
    inputAudio: {
      data: "UklGRiQA...",
      format: "wav",
    },
    model: "openai/whisper-large-v3",
  },
};
```

## Fields

| Field                                                                                                                                             | Type                                                                                                                                              | Required                                                                                                                                          | Description                                                                                                                                       | Example                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`                                                                                                                                     | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br/>This is used to track API usage per application.<br/> |                                                                                                                                                   |
| `appTitle`                                                                                                                                        | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br/>                                                 |                                                                                                                                                   |
| `appCategories`                                                                                                                                   | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br/>                                        |                                                                                                                                                   |
| `sttRequest`                                                                                                                                      | [models.STTRequest](../../models/sttrequest.md)                                                                                                   | :heavy_check_mark:                                                                                                                                | N/A                                                                                                                                               | {<br/>"input_audio": {<br/>"data": "UklGRiQA...",<br/>"format": "wav"<br/>},<br/>"language": "en",<br/>"model": "openai/whisper-large-v3"<br/>}   |