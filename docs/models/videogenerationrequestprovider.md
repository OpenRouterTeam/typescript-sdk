# VideoGenerationRequestProvider

Provider-specific passthrough configuration

## Example Usage

```typescript
import { VideoGenerationRequestProvider } from "@openrouter/sdk/models";

let value: VideoGenerationRequestProvider = {};
```

## Fields

| Field                                                                                                                             | Type                                                                                                                              | Required                                                                                                                          | Description                                                                                                                       | Example                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `options`                                                                                                                         | [models.VideoGenerationRequestOptions](../models/videogenerationrequestoptions.md)                                                | :heavy_minus_sign:                                                                                                                | Provider-specific options keyed by provider slug. The options for the matched provider are spread into the upstream request body. | {<br/>"google-vertex": {<br/>"output_config": {<br/>"effort": "low"<br/>}<br/>}<br/>}                                             |