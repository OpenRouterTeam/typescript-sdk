# CreateWorkspaceRequest

## Example Usage

```typescript
import { CreateWorkspaceRequest } from "@openrouter/sdk/models";

let value: CreateWorkspaceRequest = {
  name: "Production",
  slug: "production",
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `defaultImageModel`                                                 | *string*                                                            | :heavy_minus_sign:                                                  | Default image model for this workspace                              | openai/dall-e-3                                                     |
| `defaultProviderSort`                                               | *string*                                                            | :heavy_minus_sign:                                                  | Default provider sort preference (e.g., price, throughput, latency) | price                                                               |
| `defaultTextModel`                                                  | *string*                                                            | :heavy_minus_sign:                                                  | Default text model for this workspace                               | openai/gpt-4o                                                       |
| `description`                                                       | *string*                                                            | :heavy_minus_sign:                                                  | Description of the workspace                                        | Production environment workspace                                    |
| `isBroadcastEnabled`                                                | *boolean*                                                           | :heavy_minus_sign:                                                  | Whether broadcast is enabled                                        | false                                                               |
| `isDataDiscountLoggingEnabled`                                      | *boolean*                                                           | :heavy_minus_sign:                                                  | Whether data discount logging is enabled                            | true                                                                |
| `isPrivateLoggingEnabled`                                           | *boolean*                                                           | :heavy_minus_sign:                                                  | Whether private logging is enabled                                  | false                                                               |
| `name`                                                              | *string*                                                            | :heavy_check_mark:                                                  | Name for the new workspace                                          | Production                                                          |
| `slug`                                                              | *string*                                                            | :heavy_check_mark:                                                  | URL-friendly slug (lowercase alphanumeric and hyphens only)         | production                                                          |