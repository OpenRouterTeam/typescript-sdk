# ExchangeAuthorizationCodeRequest

## Example Usage

```typescript
import { ExchangeAuthorizationCodeRequest } from "@openrouter/sdk/models/operations";

let value: ExchangeAuthorizationCodeRequest = {
  code: "auth_code_abc123def456",
  codeVerifier: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
  codeChallengeMethod: "S256",
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `code`                                                                                                                             | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | The authorization code received from the OAuth redirect                                                                            | auth_code_abc123def456                                                                                                             |
| `codeVerifier`                                                                                                                     | *string*                                                                                                                           | :heavy_minus_sign:                                                                                                                 | The code verifier if code_challenge was used in the authorization request                                                          | dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk                                                                                        |
| `codeChallengeMethod`                                                                                                              | [operations.ExchangeAuthorizationCodeCodeChallengeMethod](../../models/operations/exchangeauthorizationcodecodechallengemethod.md) | :heavy_minus_sign:                                                                                                                 | The method used to generate the code challenge                                                                                     | S256                                                                                                                               |