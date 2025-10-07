# PluginWeb

## Example Usage

```typescript
import { PluginWeb } from "@openrouter/sdk/models";

let value: PluginWeb = {
  id: "web",
  maxResults: 7404.94,
  searchPrompt: "<value>",
  engine: "exa",
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `id`                                 | [models.IdWeb](../models/idweb.md)   | :heavy_check_mark:                   | N/A                                  |
| `maxResults`                         | *number*                             | :heavy_minus_sign:                   | N/A                                  |
| `searchPrompt`                       | *string*                             | :heavy_minus_sign:                   | N/A                                  |
| `engine`                             | [models.Engine](../models/engine.md) | :heavy_minus_sign:                   | N/A                                  |