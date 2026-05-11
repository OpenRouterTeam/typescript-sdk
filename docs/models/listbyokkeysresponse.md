# ListBYOKKeysResponse

## Example Usage

```typescript
import { ListBYOKKeysResponse } from "@openrouter/sdk/models";

let value: ListBYOKKeysResponse = {
  data: [
    {
      allowedApiKeyIds: null,
      allowedModels: null,
      allowedUserIds: null,
      createdAt: "2025-08-24T10:30:00Z",
      disabled: false,
      id: "11111111-2222-3333-4444-555555555555",
      isFallback: false,
      isRequired: false,
      label: "sk-...AbCd",
      provider: "OpenAI",
      sortOrder: 0,
    },
  ],
  totalCount: 1,
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `data`                                                 | [models.BYOKKey](../models/byokkey.md)[]               | :heavy_check_mark:                                     | List of BYOK credentials.                              |                                                        |
| `totalCount`                                           | *number*                                               | :heavy_check_mark:                                     | Total number of BYOK credentials matching the filters. | 1                                                      |