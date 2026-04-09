# Provider

Provider-specific passthrough configuration

## Example Usage

```typescript
import { Provider } from "@openrouter/sdk/models";

let value: Provider = {};
```

## Fields

| Field                                                                                                                             | Type                                                                                                                              | Required                                                                                                                          | Description                                                                                                                       | Example                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `options`                                                                                                                         | [models.Options](../models/options.md)                                                                                            | :heavy_minus_sign:                                                                                                                | Provider-specific options keyed by provider slug. The options for the matched provider are spread into the upstream request body. | {<br/>"google-vertex": {<br/>"output_config": {<br/>"effort": "low"<br/>}<br/>}<br/>}                                             |