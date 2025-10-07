# CreateRequest

## Example Usage

```typescript
import { CreateRequest } from "@openrouter/sdk/models/operations";

let value: CreateRequest = {
  name: "My New API Key",
  limit: 50,
  includeByokInLimit: true,
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    | Example                                        |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `name`                                         | *string*                                       | :heavy_check_mark:                             | Name for the new API key                       | My New API Key                                 |
| `limit`                                        | *number*                                       | :heavy_minus_sign:                             | Optional spending limit for the API key in USD | 50                                             |
| `includeByokInLimit`                           | *boolean*                                      | :heavy_minus_sign:                             | Whether to include BYOK usage in the limit     | true                                           |