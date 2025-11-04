# OpenResponsesResponseText

Text output configuration including format and verbosity

## Example Usage

```typescript
import { OpenResponsesResponseText } from "@openrouter/sdk/models";

let value: OpenResponsesResponseText = {};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `format`                                                                                     | *models.ResponseFormatTextConfig*                                                            | :heavy_minus_sign:                                                                           | Text response format configuration                                                           | {<br/>"type": "text"<br/>}                                                                   |
| `verbosity`                                                                                  | [models.OpenResponsesResponseTextVerbosity](../models/openresponsesresponsetextverbosity.md) | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |