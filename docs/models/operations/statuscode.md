# StatusCode

## Example Usage

```typescript
import { StatusCode } from "@openrouter/sdk/models/operations";

let value: StatusCode = {
  requestCount: 1234,
  statusCode: 200,
  unsuccessfulFinishCount: 5,
};
```

## Fields

| Field                                                                                                               | Type                                                                                                                | Required                                                                                                            | Description                                                                                                         | Example                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `requestCount`                                                                                                      | *number*                                                                                                            | :heavy_check_mark:                                                                                                  | Total requests with this status code in the time bucket                                                             | 1234                                                                                                                |
| `statusCode`                                                                                                        | *number*                                                                                                            | :heavy_check_mark:                                                                                                  | HTTP status code                                                                                                    | 200                                                                                                                 |
| `unsuccessfulFinishCount`                                                                                           | *number*                                                                                                            | :heavy_check_mark:                                                                                                  | Requests with HTTP 200 but unsuccessful finish reason (e.g. finish_reason=error). Only nonzero for status_code=200. | 5                                                                                                                   |