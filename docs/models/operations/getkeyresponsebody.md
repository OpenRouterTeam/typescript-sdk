# GetKeyResponseBody

API key details

## Example Usage

```typescript
import { GetKeyResponseBody } from "@openrouter/sdk/models/operations";

let value: GetKeyResponseBody = {
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

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `data`                                                         | [operations.GetKeyData](../../models/operations/getkeydata.md) | :heavy_check_mark:                                             | Current API key information                                    |