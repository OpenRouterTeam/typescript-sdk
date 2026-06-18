# ServiceUnavailableResponseErrorData

Error data for ServiceUnavailableResponse

## Example Usage

```typescript
import { ServiceUnavailableResponseErrorData } from "@openrouter/sdk/models";

let value: ServiceUnavailableResponseErrorData = {
  code: 503,
  message: "Service temporarily unavailable",
};
```

## Fields

| Field                                                                                                          | Type                                                                                                           | Required                                                                                                       | Description                                                                                                    |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `code`                                                                                                         | *number*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `message`                                                                                                      | *string*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `metadata`                                                                                                     | [models.ServiceUnavailableResponseErrorDataMetadata](../models/serviceunavailableresponseerrordatametadata.md) | :heavy_minus_sign:                                                                                             | N/A                                                                                                            |