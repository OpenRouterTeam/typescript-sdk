# ServiceUnavailableResponseErrorDataMetadata

## Example Usage

```typescript
import { ServiceUnavailableResponseErrorDataMetadata } from "@openrouter/sdk/models";

let value: ServiceUnavailableResponseErrorDataMetadata = {};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    | Example                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `errorType`                                                    | [models.ApiErrorType](../models/apierrortype.md)               | :heavy_minus_sign:                                             | Canonical OpenRouter error type, stable across all API formats | rate_limit_exceeded                                            |
| `additionalProperties`                                         | Record<string, *any*>                                          | :heavy_minus_sign:                                             | N/A                                                            |                                                                |