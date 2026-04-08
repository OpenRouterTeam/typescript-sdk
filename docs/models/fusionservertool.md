# FusionServerTool

OpenRouter built-in server tool: runs a multi-model fusion flow (fan-out → analyze → synthesize)

## Example Usage

```typescript
import { FusionServerTool } from "@openrouter/sdk/models";

let value: FusionServerTool = {
  type: "openrouter:fusion",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | *"openrouter:fusion"*                                                        | :heavy_check_mark:                                                           | N/A                                                                          |
| `parameters`                                                                 | [models.FusionServerToolParameters](../models/fusionservertoolparameters.md) | :heavy_minus_sign:                                                           | N/A                                                                          |