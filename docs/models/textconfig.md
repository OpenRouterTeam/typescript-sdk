# TextConfig

Text output configuration including format and verbosity

## Example Usage

```typescript
import { TextConfig } from "@openrouter/sdk/models";

let value: TextConfig = {};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    | Example                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `format`                                                       | *models.Formats*                                               | :heavy_minus_sign:                                             | Text response format configuration                             | {<br/>"type": "text"<br/>}                                     |
| `verbosity`                                                    | [models.TextConfigVerbosity](../models/textconfigverbosity.md) | :heavy_minus_sign:                                             | N/A                                                            |                                                                |