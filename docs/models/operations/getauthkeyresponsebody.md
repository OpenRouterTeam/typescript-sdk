# GetAuthKeyResponseBody

API key details

## Example Usage

```typescript
import { GetAuthKeyResponseBody } from "@openrouter/sdk/models/operations";

let value: GetAuthKeyResponseBody = {
  data: {
    label: "sk-or-v1-au78b3456789012345678901234567890",
    limit: 100,
    usage: 25.5,
    isFreeTier: false,
    isProvisioningKey: false,
    limitRemaining: 74.5,
    rateLimit: {
      requests: 1000,
      interval: "1h",
      note: "This field is deprecated and safe to ignore.",
    },
  },
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `data`                                                                 | [operations.GetAuthKeyData](../../models/operations/getauthkeydata.md) | :heavy_check_mark:                                                     | Current API key information                                            |