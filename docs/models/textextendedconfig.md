# TextExtendedConfig

Text output configuration including format and verbosity

## Example Usage

```typescript
import { TextExtendedConfig } from "@openrouter/sdk/models";

let value: TextExtendedConfig = {};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                | Example                                    |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `format`                                   | *models.Formats*                           | :heavy_minus_sign:                         | Text response format configuration         | {<br/>"type": "text"<br/>}                 |
| `verbosity`                                | [models.Verbosity](../models/verbosity.md) | :heavy_minus_sign:                         | N/A                                        |                                            |