# VideoGenerationRequestProvider

Provider-specific passthrough configuration

## Example Usage

```typescript
import { VideoGenerationRequestProvider } from "@openrouter/sdk/models";

let value: VideoGenerationRequestProvider = {};
```

## Fields

| Field                                                         | Type                                                          | Required                                                      | Description                                                   | Example                                                       |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `options`                                                     | [models.Options](../models/options.md)                        | :heavy_minus_sign:                                            | N/A                                                           | {<br/>"google-vertex": {<br/>"output_config": {<br/>"effort": "low"<br/>}<br/>}<br/>} |