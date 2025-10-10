# CreateAuthorizationCodeCodeChallengeMethod

The method used to generate the code challenge

## Example Usage

```typescript
import { CreateAuthorizationCodeCodeChallengeMethod } from "@openrouter/sdk/models/operations";

let value: CreateAuthorizationCodeCodeChallengeMethod = "S256";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"S256" | "plain" | Unrecognized<string>
```