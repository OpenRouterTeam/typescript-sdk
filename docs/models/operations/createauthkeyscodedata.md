# CreateAuthKeysCodeData

Auth code data

## Example Usage

```typescript
import { CreateAuthKeysCodeData } from "@openrouter/sdk/models/operations";

let value: CreateAuthKeysCodeData = {
  appId: 12345,
  createdAt: "2025-08-24T10:30:00Z",
  id: "auth_code_xyz789",
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              | Example                                                  |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `appId`                                                  | *number*                                                 | :heavy_check_mark:                                       | The application ID associated with this auth code        | 12345                                                    |
| `createdAt`                                              | *string*                                                 | :heavy_check_mark:                                       | ISO 8601 timestamp of when the auth code was created     | 2025-08-24T10:30:00Z                                     |
| `id`                                                     | *string*                                                 | :heavy_check_mark:                                       | The authorization code ID to use in the exchange request | auth_code_xyz789                                         |