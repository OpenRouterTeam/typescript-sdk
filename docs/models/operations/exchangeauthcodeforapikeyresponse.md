# ExchangeAuthCodeForAPIKeyResponse

Successfully exchanged code for an API key

## Example Usage

```typescript
import { ExchangeAuthCodeForAPIKeyResponse } from "@openrouter/sdk/models/operations";

let value: ExchangeAuthCodeForAPIKeyResponse = {
  key:
    "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",
  userId: "user_2yOPcMpKoQhcd4bVgSMlELRaIah",
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               | Example                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `key`                                                                     | *string*                                                                  | :heavy_check_mark:                                                        | The API key to use for OpenRouter requests                                | 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 |
| `userId`                                                                  | *string*                                                                  | :heavy_check_mark:                                                        | User ID associated with the API key                                       | user_2yOPcMpKoQhcd4bVgSMlELRaIah                                          |