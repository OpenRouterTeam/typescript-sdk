# UpdateWorkspaceRequest

## Example Usage

```typescript
import { UpdateWorkspaceRequest } from "@openrouter/sdk/models";

let value: UpdateWorkspaceRequest = {};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              | Example                                  |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `defaultImageModel`                      | *string*                                 | :heavy_minus_sign:                       | Default image model for this workspace   | openai/dall-e-3                          |
| `defaultProviderSort`                    | *string*                                 | :heavy_minus_sign:                       | Default provider sort preference         | price                                    |
| `defaultTextModel`                       | *string*                                 | :heavy_minus_sign:                       | Default text model for this workspace    | openai/gpt-4o                            |
| `description`                            | *string*                                 | :heavy_minus_sign:                       | New description for the workspace        | Updated description                      |
| `isBroadcastEnabled`                     | *boolean*                                | :heavy_minus_sign:                       | Whether broadcast is enabled             | false                                    |
| `isDataDiscountLoggingEnabled`           | *boolean*                                | :heavy_minus_sign:                       | Whether data discount logging is enabled | true                                     |
| `isPrivateLoggingEnabled`                | *boolean*                                | :heavy_minus_sign:                       | Whether private logging is enabled       | false                                    |
| `name`                                   | *string*                                 | :heavy_minus_sign:                       | New name for the workspace               | Updated Workspace                        |
| `slug`                                   | *string*                                 | :heavy_minus_sign:                       | New URL-friendly slug                    | updated-workspace                        |