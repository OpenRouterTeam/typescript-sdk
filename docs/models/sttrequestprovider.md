# STTRequestProvider

Provider-specific passthrough configuration

## Example Usage

```typescript
import { STTRequestProvider } from "@openrouter/sdk/models";

let value: STTRequestProvider = {};
```

## Fields

| Field                                                                                                                             | Type                                                                                                                              | Required                                                                                                                          | Description                                                                                                                       | Example                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `options`                                                                                                                         | [models.ProviderOptions](../models/provideroptions.md)                                                                            | :heavy_minus_sign:                                                                                                                | Provider-specific options keyed by provider slug. The options for the matched provider are spread into the upstream request body. | {<br/>"openai": {<br/>"max_tokens": 1000<br/>}<br/>}                                                                              |