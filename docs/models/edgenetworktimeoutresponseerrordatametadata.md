# EdgeNetworkTimeoutResponseErrorDataMetadata

## Example Usage

```typescript
import { EdgeNetworkTimeoutResponseErrorDataMetadata } from "@openrouter/sdk/models";

let value: EdgeNetworkTimeoutResponseErrorDataMetadata = {};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    | Example                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `errorType`                                                    | [models.ApiErrorType](../models/apierrortype.md)               | :heavy_minus_sign:                                             | Canonical OpenRouter error type, stable across all API formats | rate_limit_exceeded                                            |
| `additionalProperties`                                         | Record<string, *any*>                                          | :heavy_minus_sign:                                             | N/A                                                            |                                                                |