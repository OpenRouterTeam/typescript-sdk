# Workspace

## Example Usage

```typescript
import { Workspace } from "@openrouter/sdk/models";

let value: Workspace = {
  createdAt: "2025-08-24T10:30:00Z",
  createdBy: "user_abc123",
  defaultImageModel: null,
  defaultProviderSort: null,
  defaultTextModel: null,
  description: "Production environment workspace",
  id: "550e8400-e29b-41d4-a716-446655440000",
  isDataDiscountLoggingEnabled: true,
  isObservabilityBroadcastEnabled: false,
  isObservabilityIoLoggingEnabled: false,
  name: "Production",
  slug: "production",
  updatedAt: "2025-08-24T15:45:00Z",
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `createdAt`                                                         | *string*                                                            | :heavy_check_mark:                                                  | ISO 8601 timestamp of when the workspace was created                | 2025-08-24T10:30:00Z                                                |
| `createdBy`                                                         | *string*                                                            | :heavy_check_mark:                                                  | User ID of the workspace creator                                    | user_abc123                                                         |
| `defaultImageModel`                                                 | *string*                                                            | :heavy_check_mark:                                                  | Default image model for this workspace                              | openai/dall-e-3                                                     |
| `defaultProviderSort`                                               | *string*                                                            | :heavy_check_mark:                                                  | Default provider sort preference (e.g., price, throughput, latency) | price                                                               |
| `defaultTextModel`                                                  | *string*                                                            | :heavy_check_mark:                                                  | Default text model for this workspace                               | openai/gpt-4o                                                       |
| `description`                                                       | *string*                                                            | :heavy_check_mark:                                                  | Description of the workspace                                        | Production environment workspace                                    |
| `id`                                                                | *string*                                                            | :heavy_check_mark:                                                  | Unique identifier for the workspace                                 | 550e8400-e29b-41d4-a716-446655440000                                |
| `isDataDiscountLoggingEnabled`                                      | *boolean*                                                           | :heavy_check_mark:                                                  | Whether data discount logging is enabled for this workspace         | true                                                                |
| `isObservabilityBroadcastEnabled`                                   | *boolean*                                                           | :heavy_check_mark:                                                  | Whether broadcast is enabled for this workspace                     | false                                                               |
| `isObservabilityIoLoggingEnabled`                                   | *boolean*                                                           | :heavy_check_mark:                                                  | Whether private logging is enabled for this workspace               | false                                                               |
| `name`                                                              | *string*                                                            | :heavy_check_mark:                                                  | Name of the workspace                                               | Production                                                          |
| `slug`                                                              | *string*                                                            | :heavy_check_mark:                                                  | URL-friendly slug for the workspace                                 | production                                                          |
| `updatedAt`                                                         | *string*                                                            | :heavy_check_mark:                                                  | ISO 8601 timestamp of when the workspace was last updated           | 2025-08-24T15:45:00Z                                                |