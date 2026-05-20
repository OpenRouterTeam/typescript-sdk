# RotateWebhookSecretResponse

Response body returned after rotating a tenant engine webhook secret.

## Example Usage

```typescript
import { RotateWebhookSecretResponse } from "@openrouter/sdk/models";

let value: RotateWebhookSecretResponse = {
  overlapExpiresAt: 1700000000000,
  secret: "Q3K2H7Vw0fM4S8tZpXrYbN1Lc6jE9aRdUuVwXyZ123_",
  secretId: "tools/acme/thumbnailer/webhook-secret",
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          | Example                                                                                              |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `overlapExpiresAt`                                                                                   | *number*                                                                                             | :heavy_check_mark:                                                                                   | Unix-epoch ms after which the old secret is no longer accepted. Equal to `now + 5 * 60_000`.         | 1700000000000                                                                                        |
| `secret`                                                                                             | *string*                                                                                             | :heavy_check_mark:                                                                                   | New webhook secret in base64url. Shown ONCE — store it in your engine before closing the modal.      | AbCdEf123...                                                                                         |
| `secretId`                                                                                           | *string*                                                                                             | :heavy_check_mark:                                                                                   | Reference identifier stored on the engine row. The dispatcher loads the cleartext value via this id. | tools/acme/thumbnailer/webhook-secret                                                                |