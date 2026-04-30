# SpeechRequestProvider

Provider-specific passthrough configuration

## Example Usage

```typescript
import { SpeechRequestProvider } from "@openrouter/sdk/models";

let value: SpeechRequestProvider = {};
```

## Fields

| Field                                                                                                                             | Type                                                                                                                              | Required                                                                                                                          | Description                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `options`                                                                                                                         | [models.SpeechRequestOptions](../models/speechrequestoptions.md)                                                                  | :heavy_minus_sign:                                                                                                                | Provider-specific options keyed by provider slug. The options for the matched provider are spread into the upstream request body. |