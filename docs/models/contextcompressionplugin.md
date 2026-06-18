# ContextCompressionPlugin

## Example Usage

```typescript
import { ContextCompressionPlugin } from "@openrouter/sdk/models";

let value: ContextCompressionPlugin = {
  id: "context-compression",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `enabled`                                                                                  | *boolean*                                                                                  | :heavy_minus_sign:                                                                         | Set to false to disable the context-compression plugin for this request. Defaults to true. |                                                                                            |
| `engine`                                                                                   | [models.ContextCompressionEngine](../models/contextcompressionengine.md)                   | :heavy_minus_sign:                                                                         | The compression engine to use. Defaults to "middle-out".                                   | middle-out                                                                                 |
| `headroomBaseUrl`                                                                          | *string*                                                                                   | :heavy_minus_sign:                                                                         | Base URL of a running Headroom proxy. Required when engine is "headroom".                  |                                                                                            |
| `id`                                                                                       | *"context-compression"*                                                                    | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |