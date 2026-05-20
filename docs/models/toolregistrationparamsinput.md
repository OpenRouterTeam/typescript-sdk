# ToolRegistrationParamsInput

Optional registration parameters for a catalog tool engine.

## Example Usage

```typescript
import { ToolRegistrationParamsInput } from "@openrouter/sdk/models";

let value: ToolRegistrationParamsInput = {};
```

## Fields

| Field                                                                                                         | Type                                                                                                          | Required                                                                                                      | Description                                                                                                   | Example                                                                                                       |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `engineExtensionPolicy`                                                                                       | [models.ToolEngineExtensionPolicy](../models/toolengineextensionpolicy.md)                                    | :heavy_minus_sign:                                                                                            | How the engine treats unknown request fields. `strict` rejects them; `meta-only` allows opaque metadata only. | meta-only                                                                                                     |
| `maxConcurrency`                                                                                              | *number*                                                                                                      | :heavy_minus_sign:                                                                                            | N/A                                                                                                           |                                                                                                               |