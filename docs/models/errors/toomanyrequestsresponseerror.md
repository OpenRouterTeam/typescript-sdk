# TooManyRequestsResponseError

Too Many Requests - Rate limit exceeded

## Example Usage

```typescript
import { TooManyRequestsResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                                       | Type                                                                                        | Required                                                                                    | Description                                                                                 | Example                                                                                     |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `error`                                                                                     | [models.TooManyRequestsResponseErrorData](../../models/toomanyrequestsresponseerrordata.md) | :heavy_check_mark:                                                                          | Error data for TooManyRequestsResponse                                                      | {<br/>"code": 429,<br/>"message": "Rate limit exceeded"<br/>}                               |
| `userId`                                                                                    | *string*                                                                                    | :heavy_minus_sign:                                                                          | N/A                                                                                         |                                                                                             |