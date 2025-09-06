# Reasoning

Reasoning configuration

## Example Usage

```typescript
import { Reasoning } from "open-router/models";

let value: Reasoning = {};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `enabled`                                                           | *boolean*                                                           | :heavy_minus_sign:                                                  | Enables reasoning with default settings. Only work for some models. |
| `effort`                                                            | [models.Effort](../models/effort.md)                                | :heavy_minus_sign:                                                  | OpenAI-style reasoning effort setting                               |
| `maxTokens`                                                         | *number*                                                            | :heavy_minus_sign:                                                  | non-OpenAI-style reasoning effort setting                           |
| `exclude`                                                           | *boolean*                                                           | :heavy_minus_sign:                                                  | N/A                                                                 |