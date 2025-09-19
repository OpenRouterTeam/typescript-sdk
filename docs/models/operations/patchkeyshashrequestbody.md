# PatchKeysHashRequestBody

## Example Usage

```typescript
import { PatchKeysHashRequestBody } from "open-router/models/operations";

let value: PatchKeysHashRequestBody = {
  name: "Updated API Key Name",
  disabled: false,
  limit: 75,
  includeByokInLimit: true,
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                | Example                                    |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `name`                                     | *string*                                   | :heavy_minus_sign:                         | New name for the API key                   | Updated API Key Name                       |
| `disabled`                                 | *boolean*                                  | :heavy_minus_sign:                         | Whether to disable the API key             | false                                      |
| `limit`                                    | *number*                                   | :heavy_minus_sign:                         | New spending limit for the API key in USD  | 75                                         |
| `includeByokInLimit`                       | *boolean*                                  | :heavy_minus_sign:                         | Whether to include BYOK usage in the limit | true                                       |