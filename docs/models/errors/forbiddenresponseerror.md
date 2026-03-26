# ForbiddenResponseError

Forbidden - Authentication successful but insufficient permissions

## Example Usage

```typescript
import { ForbiddenResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     | Example                                                                         |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `error`                                                                         | [models.ForbiddenResponseErrorData](../../models/forbiddenresponseerrordata.md) | :heavy_check_mark:                                                              | Error data for ForbiddenResponse                                                | {<br/>"code": 403,<br/>"message": "Only management keys can perform this operation"<br/>} |
| `userId`                                                                        | *string*                                                                        | :heavy_minus_sign:                                                              | N/A                                                                             |                                                                                 |