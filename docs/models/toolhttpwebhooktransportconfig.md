# ToolHttpWebhookTransportConfig

HTTP webhook transport for tenant-hosted tools.

## Example Usage

```typescript
import { ToolHttpWebhookTransportConfig } from "@openrouter/sdk/models";

let value: ToolHttpWebhookTransportConfig = {
  auth: {
    kind: "hmac_sha256",
    secretId: "tools/acme/web-search/webhook-secret",
    signatureHeader: "X-OpenRouter-Signature",
  },
  transport: "http-webhook",
  url: "https://tools.acme.example/dispatch",
};
```

## Fields

| Field                                                                                                                      | Type                                                                                                                       | Required                                                                                                                   | Description                                                                                                                | Example                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `auth`                                                                                                                     | [models.ToolWebhookAuth](../models/toolwebhookauth.md)                                                                     | :heavy_check_mark:                                                                                                         | HMAC SHA-256 webhook authentication metadata.                                                                              | {<br/>"kind": "hmac_sha256",<br/>"secretId": "tools/acme/web-search/webhook-secret",<br/>"signatureHeader": "X-OpenRouter-Signature"<br/>} |
| `transport`                                                                                                                | *"http-webhook"*                                                                                                           | :heavy_check_mark:                                                                                                         | N/A                                                                                                                        |                                                                                                                            |
| `url`                                                                                                                      | *string*                                                                                                                   | :heavy_check_mark:                                                                                                         | N/A                                                                                                                        |                                                                                                                            |