# ChatAudioOutput

Audio output data or reference

## Example Usage

```typescript
import { ChatAudioOutput } from "@openrouter/sdk/models";

let value: ChatAudioOutput = {};
```

## Fields

| Field                      | Type                       | Required                   | Description                |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| `id`                       | *string*                   | :heavy_minus_sign:         | Audio output identifier    |
| `expiresAt`                | *number*                   | :heavy_minus_sign:         | Audio expiration timestamp |
| `data`                     | *string*                   | :heavy_minus_sign:         | Base64 encoded audio data  |
| `transcript`               | *string*                   | :heavy_minus_sign:         | Audio transcript           |