# GetKeysData

## Example Usage

```typescript
import { GetKeysData } from "open-router/models/operations";

let value: GetKeysData = {
  hash: "sk-or-v1-abc123def456",
  name: "My Production Key",
  label: "Production API Key",
  disabled: false,
  limit: 100,
  usage: 25.5,
  createdAt: "2025-08-24T10:30:00Z",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             | Example                                                 |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `hash`                                                  | *string*                                                | :heavy_check_mark:                                      | Unique hash identifier for the API key                  | sk-or-v1-abc123def456                                   |
| `name`                                                  | *string*                                                | :heavy_check_mark:                                      | Name of the API key                                     | My Production Key                                       |
| `label`                                                 | *string*                                                | :heavy_check_mark:                                      | Human-readable label for the API key                    | Production API Key                                      |
| `disabled`                                              | *boolean*                                               | :heavy_check_mark:                                      | Whether the API key is disabled                         | false                                                   |
| `limit`                                                 | *number*                                                | :heavy_check_mark:                                      | Spending limit for the API key in USD                   | 100                                                     |
| `usage`                                                 | *number*                                                | :heavy_check_mark:                                      | Current usage of the API key in USD                     | 25.5                                                    |
| `createdAt`                                             | *string*                                                | :heavy_check_mark:                                      | ISO 8601 timestamp of when the API key was created      | 2025-08-24T10:30:00Z                                    |
| `updatedAt`                                             | *string*                                                | :heavy_check_mark:                                      | ISO 8601 timestamp of when the API key was last updated | 2025-08-24T15:45:00Z                                    |