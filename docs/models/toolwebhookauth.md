# ToolWebhookAuth

HMAC SHA-256 webhook authentication metadata.

## Example Usage

```typescript
import { ToolWebhookAuth } from "@openrouter/sdk/models";

let value: ToolWebhookAuth = {
  kind: "hmac_sha256",
  secretId: "tools/acme/web-search/webhook-secret",
  signatureHeader: "X-OpenRouter-Signature",
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `kind`                           | [models.Kind](../models/kind.md) | :heavy_check_mark:               | N/A                              |
| `secretId`                       | *string*                         | :heavy_check_mark:               | N/A                              |
| `signatureHeader`                | *string*                         | :heavy_check_mark:               | N/A                              |