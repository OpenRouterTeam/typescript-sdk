# RequestTimeoutResponseError

Request Timeout - Operation exceeded time limit

## Example Usage

```typescript
import { RequestTimeoutResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                                     | Type                                                                                      | Required                                                                                  | Description                                                                               | Example                                                                                   |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `error`                                                                                   | [models.RequestTimeoutResponseErrorData](../../models/requesttimeoutresponseerrordata.md) | :heavy_check_mark:                                                                        | Error data for RequestTimeoutResponse                                                     | {<br/>"code": 408,<br/>"message": "Operation timed out. Please try again later."<br/>}    |
| `userId`                                                                                  | *string*                                                                                  | :heavy_minus_sign:                                                                        | N/A                                                                                       |                                                                                           |