# BadRequestResponseError

Bad Request - Invalid request parameters or malformed input

## Example Usage

```typescript
import { BadRequestResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                                                     | Type                                                                                                      | Required                                                                                                  | Description                                                                                               | Example                                                                                                   |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `error`                                                                                                   | [models.BadRequestResponseErrorData](../../models/badrequestresponseerrordata.md)                         | :heavy_check_mark:                                                                                        | Error data for BadRequestResponse                                                                         | {<br/>"code": 400,<br/>"message": "Invalid request parameters",<br/>"metadata": {<br/>"error_type": "invalid_request"<br/>}<br/>} |
| `openrouterMetadata`                                                                                      | Record<string, *any*>                                                                                     | :heavy_minus_sign:                                                                                        | N/A                                                                                                       |                                                                                                           |
| `userId`                                                                                                  | *string*                                                                                                  | :heavy_minus_sign:                                                                                        | N/A                                                                                                       |                                                                                                           |