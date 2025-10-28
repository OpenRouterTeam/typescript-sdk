# ResponseTextConfig

Text output configuration including format and verbosity

## Example Usage

```typescript
import { ResponseTextConfig } from "@openrouter/sdk/models";

let value: ResponseTextConfig = {
  format: {
    type: "text",
  },
  verbosity: "medium",
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    | Example                                                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `format`                                                                       | *models.ResponseFormatTextConfig*                                              | :heavy_minus_sign:                                                             | Text response format configuration                                             | {<br/>"type": "text"<br/>}                                                     |
| `verbosity`                                                                    | [models.ResponseTextConfigVerbosity](../models/responsetextconfigverbosity.md) | :heavy_minus_sign:                                                             | N/A                                                                            |                                                                                |