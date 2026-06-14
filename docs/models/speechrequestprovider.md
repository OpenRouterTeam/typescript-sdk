# SpeechRequestProvider

Provider-specific passthrough configuration

## Example Usage

```typescript
import { SpeechRequestProvider } from "@openrouter/sdk/models";

let value: SpeechRequestProvider = {};
```

## Fields

| Field                                                                                                                                                                | Type                                                                                                                                                                 | Required                                                                                                                                                             | Description                                                                                                                                                          | Example                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`                                                                                                                                                            | [models.ProviderOptions](../models/provideroptions.md)                                                                                                               | :heavy_minus_sign:                                                                                                                                                   | Provider-specific options keyed by provider slug. Only options for the matched provider are forwarded; the rest are ignored. Unrecognized keys are silently dropped. | {<br/>"openai": {<br/>"max_tokens": 1000<br/>}<br/>}                                                                                                                 |