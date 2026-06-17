# GetProviderStatusCodesData

## Example Usage

```typescript
import { GetProviderStatusCodesData } from "@openrouter/sdk/models/operations";

let value: GetProviderStatusCodesData = {
  endpointId: "955a2bd9-841c-4cec-a92e-dbfd93111b24",
  hour: "2026-06-16 14:00:00",
  modelPermaslug: "openai/gpt-4o",
  statusCodes: [
    {
      requestCount: 1234,
      statusCode: 200,
      unsuccessfulFinishCount: 5,
    },
  ],
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      | Example                                                          |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `endpointId`                                                     | *string*                                                         | :heavy_check_mark:                                               | Endpoint UUID                                                    | 955a2bd9-841c-4cec-a92e-dbfd93111b24                             |
| `hour`                                                           | *string*                                                         | :heavy_check_mark:                                               | Start of the time bucket (ISO 8601)                              | 2026-06-16 14:00:00                                              |
| `modelPermaslug`                                                 | *string*                                                         | :heavy_check_mark:                                               | Model permaslug for this endpoint                                | openai/gpt-4o                                                    |
| `statusCodes`                                                    | [operations.StatusCode](../../models/operations/statuscode.md)[] | :heavy_check_mark:                                               | Breakdown of request counts by HTTP status code                  |                                                                  |