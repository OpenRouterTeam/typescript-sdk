# ToolTransportConfigInput

Transport configuration for a catalog tool engine.


## Supported Types

### `models.ToolHttpWebhookTransportConfig`

```typescript
const value: models.ToolHttpWebhookTransportConfig = {
  auth: {
    kind: "hmac_sha256",
    secretId: "tools/acme/web-search/webhook-secret",
    signatureHeader: "X-OpenRouter-Signature",
  },
  transport: "http-webhook",
  url: "https://tools.acme.example/dispatch",
};
```

### `models.ToolNativeTransportConfig`

```typescript
const value: models.ToolNativeTransportConfig = {
  transport: "native",
};
```

