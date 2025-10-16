# OpenResponsesTextConfig

Text output configuration including format and verbosity

## Example Usage

```typescript
import { OpenResponsesTextConfig } from "@openrouter/sdk/models";

let value: OpenResponsesTextConfig = {
  format: {
    type: "text",
  },
  verbosity: "medium",
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                | Example                                    |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `format`                                   | *models.OpenResponsesFormatTextConfig*     | :heavy_minus_sign:                         | Text response format configuration         | {<br/>"type": "text"<br/>}                 |
| `verbosity`                                | [models.Verbosity](../models/verbosity.md) | :heavy_minus_sign:                         | N/A                                        |                                            |