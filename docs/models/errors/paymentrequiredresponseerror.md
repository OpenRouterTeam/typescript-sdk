# PaymentRequiredResponseError

Payment Required - Insufficient credits or quota to complete request

## Example Usage

```typescript
import { PaymentRequiredResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      | Example                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `error`                                                                                          | [models.PaymentRequiredResponseErrorData](../../models/paymentrequiredresponseerrordata.md)      | :heavy_check_mark:                                                                               | Error data for PaymentRequiredResponse                                                           | {<br/>"code": 402,<br/>"message": "Insufficient credits. Add more using https://openrouter.ai/credits"<br/>} |
| `userId`                                                                                         | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |