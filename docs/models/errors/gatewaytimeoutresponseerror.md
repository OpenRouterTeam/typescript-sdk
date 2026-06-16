# GatewayTimeoutResponseError

Gateway Timeout - Provider request timed out

## Example Usage

```typescript
import { GatewayTimeoutResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                                     | Type                                                                                      | Required                                                                                  | Description                                                                               | Example                                                                                   |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `error`                                                                                   | [models.GatewayTimeoutResponseErrorData](../../models/gatewaytimeoutresponseerrordata.md) | :heavy_check_mark:                                                                        | Error data for GatewayTimeoutResponse                                                     | {<br/>"code": 504,<br/>"message": "Request timed out. Please try again later."<br/>}      |
| `openrouterMetadata`                                                                      | Record<string, *any*>                                                                     | :heavy_minus_sign:                                                                        | N/A                                                                                       |                                                                                           |
| `userId`                                                                                  | *string*                                                                                  | :heavy_minus_sign:                                                                        | N/A                                                                                       |                                                                                           |