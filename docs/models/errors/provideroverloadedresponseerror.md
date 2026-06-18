# ProviderOverloadedResponseError

Provider Overloaded - Provider is temporarily overloaded

## Example Usage

```typescript
import { ProviderOverloadedResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                | Example                                                                                                    |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `error`                                                                                                    | [models.ProviderOverloadedResponseErrorData](../../models/provideroverloadedresponseerrordata.md)          | :heavy_check_mark:                                                                                         | Error data for ProviderOverloadedResponse                                                                  | {<br/>"code": 529,<br/>"message": "Provider returned error",<br/>"metadata": {<br/>"error_type": "provider_overloaded"<br/>}<br/>} |
| `openrouterMetadata`                                                                                       | Record<string, *any*>                                                                                      | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |                                                                                                            |
| `userId`                                                                                                   | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |                                                                                                            |