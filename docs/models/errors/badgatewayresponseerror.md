# BadGatewayResponseError

Bad Gateway - Provider/upstream API failure

## Example Usage

```typescript
import { BadGatewayResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                             | Type                                                                              | Required                                                                          | Description                                                                       | Example                                                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `error`                                                                           | [models.BadGatewayResponseErrorData](../../models/badgatewayresponseerrordata.md) | :heavy_check_mark:                                                                | Error data for BadGatewayResponse                                                 | {<br/>"code": 502,<br/>"message": "Provider returned error"<br/>}                 |
| `userId`                                                                          | *string*                                                                          | :heavy_minus_sign:                                                                | N/A                                                                               |                                                                                   |