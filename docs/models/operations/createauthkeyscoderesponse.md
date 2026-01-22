# CreateAuthKeysCodeResponse

Successfully created authorization code

## Example Usage

```typescript
import { CreateAuthKeysCodeResponse } from "@openrouter/sdk/models/operations";

let value: CreateAuthKeysCodeResponse = {
  data: {
    id: "auth_code_xyz789",
    appId: 12345,
    createdAt: "2025-08-24T10:30:00Z",
  },
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            | Example                                                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `data`                                                                                 | [operations.CreateAuthKeysCodeData](../../models/operations/createauthkeyscodedata.md) | :heavy_check_mark:                                                                     | Auth code data                                                                         | {<br/>"id": "auth_code_xyz789",<br/>"app_id": 12345,<br/>"created_at": "2025-08-24T10:30:00Z"<br/>} |