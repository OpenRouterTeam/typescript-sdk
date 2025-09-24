# PostAuthKeysCodeRequest

## Example Usage

```typescript
import { PostAuthKeysCodeRequest } from "@openrouter/sdk/models/operations";

let value: PostAuthKeysCodeRequest = {
  callbackUrl: "https://myapp.com/auth/callback",
  codeChallenge: "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
  codeChallengeMethod: "S256",
  limit: "100.0",
};
```

## Fields

| Field                                                                                                            | Type                                                                                                             | Required                                                                                                         | Description                                                                                                      | Example                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `callbackUrl`                                                                                                    | *string*                                                                                                         | :heavy_check_mark:                                                                                               | The callback URL to redirect to after authorization. Note, only https URLs on ports 443 and 3000 are allowed.    | https://myapp.com/auth/callback                                                                                  |
| `codeChallenge`                                                                                                  | *string*                                                                                                         | :heavy_minus_sign:                                                                                               | PKCE code challenge for enhanced security                                                                        | E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM                                                                      |
| `codeChallengeMethod`                                                                                            | [operations.PostAuthKeysCodeCodeChallengeMethod](../../models/operations/postauthkeyscodecodechallengemethod.md) | :heavy_minus_sign:                                                                                               | The method used to generate the code challenge                                                                   | S256                                                                                                             |
| `limit`                                                                                                          | *string*                                                                                                         | :heavy_minus_sign:                                                                                               | Credit limit for the API key to be created                                                                       | 100.0                                                                                                            |