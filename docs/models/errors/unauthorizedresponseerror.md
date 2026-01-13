# UnauthorizedResponseError

Unauthorized - Authentication required or invalid credentials

## Example Usage

```typescript
import { UnauthorizedResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                                 | Type                                                                                  | Required                                                                              | Description                                                                           | Example                                                                               |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `error`                                                                               | [models.UnauthorizedResponseErrorData](../../models/unauthorizedresponseerrordata.md) | :heavy_check_mark:                                                                    | Error data for UnauthorizedResponse                                                   | {<br/>"code": 401,<br/>"message": "Missing Authentication header"<br/>}               |
| `userId`                                                                              | *string*                                                                              | :heavy_minus_sign:                                                                    | N/A                                                                                   |                                                                                       |