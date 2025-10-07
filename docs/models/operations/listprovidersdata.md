# ListProvidersData

## Example Usage

```typescript
import { ListProvidersData } from "@openrouter/sdk/models/operations";

let value: ListProvidersData = {
  name: "OpenAI",
  slug: "openai",
  privacyPolicyUrl: "https://openai.com/privacy",
  termsOfServiceUrl: "https://openai.com/terms",
  statusPageUrl: "https://status.openai.com",
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              | Example                                  |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `name`                                   | *string*                                 | :heavy_check_mark:                       | Display name of the provider             | OpenAI                                   |
| `slug`                                   | *string*                                 | :heavy_check_mark:                       | URL-friendly identifier for the provider | openai                                   |
| `privacyPolicyUrl`                       | *string*                                 | :heavy_check_mark:                       | URL to the provider's privacy policy     | https://openai.com/privacy               |
| `termsOfServiceUrl`                      | *string*                                 | :heavy_minus_sign:                       | URL to the provider's terms of service   | https://openai.com/terms                 |
| `statusPageUrl`                          | *string*                                 | :heavy_minus_sign:                       | URL to the provider's status page        | https://status.openai.com                |