# ImageGenerationRequestProvider

Provider-specific passthrough configuration

## Example Usage

```typescript
import { ImageGenerationRequestProvider } from "@openrouter/sdk/models";

let value: ImageGenerationRequestProvider = {};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             | Example                                                 |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `options`                                               | Record<string, Record<string, *any*>>                   | :heavy_minus_sign:                                      | N/A                                                     | {<br/>"black-forest-labs": {<br/>"guidance": 3,<br/>"steps": 40<br/>}<br/>} |