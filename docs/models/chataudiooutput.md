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
| `data`                     | *string*                   | :heavy_minus_sign:         | Base64 encoded audio data  |
| `expiresAt`                | *number*                   | :heavy_minus_sign:         | Audio expiration timestamp |
| `id`                       | *string*                   | :heavy_minus_sign:         | Audio output identifier    |
| `transcript`               | *string*                   | :heavy_minus_sign:         | Audio transcript           |