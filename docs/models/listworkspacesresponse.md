# ListWorkspacesResponse

## Example Usage

```typescript
import { ListWorkspacesResponse } from "@openrouter/sdk/models";

let value: ListWorkspacesResponse = {
  data: [
    {
      createdAt: "2025-08-24T10:30:00Z",
      createdBy: "user_abc123",
      defaultImageModel: "openai/dall-e-3",
      defaultProviderSort: "price",
      defaultTextModel: "openai/gpt-4o",
      description: "Production environment workspace",
      id: "550e8400-e29b-41d4-a716-446655440000",
      ioLoggingApiKeyIds: null,
      ioLoggingSamplingRate: 1,
      isDataDiscountLoggingEnabled: true,
      isObservabilityBroadcastEnabled: false,
      isObservabilityIoLoggingEnabled: false,
      name: "Production",
      slug: "production",
      updatedAt: "2025-08-24T15:45:00Z",
    },
  ],
  totalCount: 1,
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  | Example                                      |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `data`                                       | [models.Workspace](../models/workspace.md)[] | :heavy_check_mark:                           | List of workspaces                           |                                              |
| `totalCount`                                 | *number*                                     | :heavy_check_mark:                           | Total number of workspaces                   | 5                                            |