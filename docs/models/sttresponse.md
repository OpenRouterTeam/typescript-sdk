# STTResponse

STT response containing transcribed text and optional usage statistics

## Example Usage

```typescript
import { STTResponse } from "@openrouter/sdk/models";

let value: STTResponse = {
  text: "Hello, this is a test of OpenAI speech-to-text transcription.",
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `text`                                                                                                                             | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | The transcribed text                                                                                                               | Hello, this is a test of OpenAI speech-to-text transcription. The weather is sunny today and the temperature is around 72 degrees. |
| `usage`                                                                                                                            | [models.STTUsage](../models/sttusage.md)                                                                                           | :heavy_minus_sign:                                                                                                                 | Aggregated usage statistics for the request                                                                                        | {<br/>"cost": 0.000508,<br/>"input_tokens": 83,<br/>"output_tokens": 30,<br/>"seconds": 9.2,<br/>"total_tokens": 113<br/>}         |
| `usageBreakdown`                                                                                                                   | *models.UsageBreakdown*[]                                                                                                          | :heavy_minus_sign:                                                                                                                 | Per-billing-type usage breakdown. Each entry is discriminated by "type" (e.g. "duration", "tokens").                               |                                                                                                                                    |