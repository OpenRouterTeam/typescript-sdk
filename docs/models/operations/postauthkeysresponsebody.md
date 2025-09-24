# PostAuthKeysResponseBody

Successfully exchanged code for an API key

## Example Usage

```typescript
import { PostAuthKeysResponseBody } from "@openrouter/sdk/models/operations";

let value: PostAuthKeysResponseBody = {
  key: "sk-or-v1-abc123def456ghi789jkl012",
  userId: "or_user_1234567890abcdef",
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                | Example                                    |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `key`                                      | *string*                                   | :heavy_check_mark:                         | The API key to use for OpenRouter requests | sk-or-v1-abc123def456ghi789jkl012          |
| `userId`                                   | *string*                                   | :heavy_check_mark:                         | User ID associated with the API key        | or_user_1234567890abcdef                   |