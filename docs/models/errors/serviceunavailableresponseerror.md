# ServiceUnavailableResponseError

Service Unavailable - Service temporarily unavailable

## Example Usage

```typescript
import { ServiceUnavailableResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                                                              | Type                                                                                                               | Required                                                                                                           | Description                                                                                                        | Example                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `error`                                                                                                            | [models.ServiceUnavailableResponseErrorData](../../models/serviceunavailableresponseerrordata.md)                  | :heavy_check_mark:                                                                                                 | Error data for ServiceUnavailableResponse                                                                          | {<br/>"code": 503,<br/>"message": "Service temporarily unavailable",<br/>"metadata": {<br/>"error_type": "provider_overloaded"<br/>}<br/>} |
| `openrouterMetadata`                                                                                               | Record<string, *any*>                                                                                              | :heavy_minus_sign:                                                                                                 | N/A                                                                                                                |                                                                                                                    |
| `userId`                                                                                                           | *string*                                                                                                           | :heavy_minus_sign:                                                                                                 | N/A                                                                                                                |                                                                                                                    |