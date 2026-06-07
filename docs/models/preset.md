# Preset

A preset without version details.

## Example Usage

```typescript
import { Preset } from "@openrouter/sdk/models";

let value: Preset = {
  createdAt: "2026-04-20T10:00:00Z",
  creatorUserId: "user_2dHFtVWx2n56w6HkM0000000000",
  description: null,
  designatedVersionId: "550e8400-e29b-41d4-a716-446655440000",
  id: "650e8400-e29b-41d4-a716-446655440001",
  name: "my-preset",
  slug: "my-preset",
  status: "active",
  statusUpdatedAt: null,
  updatedAt: "2026-04-20T10:00:00Z",
  workspaceId: "750e8400-e29b-41d4-a716-446655440002",
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      | Example                                          |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `createdAt`                                      | *string*                                         | :heavy_check_mark:                               | N/A                                              |                                                  |
| `creatorUserId`                                  | *string*                                         | :heavy_check_mark:                               | N/A                                              |                                                  |
| `description`                                    | *string*                                         | :heavy_check_mark:                               | N/A                                              |                                                  |
| `designatedVersionId`                            | *string*                                         | :heavy_check_mark:                               | N/A                                              |                                                  |
| `id`                                             | *string*                                         | :heavy_check_mark:                               | N/A                                              |                                                  |
| `name`                                           | *string*                                         | :heavy_check_mark:                               | N/A                                              |                                                  |
| `slug`                                           | *string*                                         | :heavy_check_mark:                               | N/A                                              |                                                  |
| `status`                                         | [models.PresetStatus](../models/presetstatus.md) | :heavy_check_mark:                               | The status of a preset.                          | active                                           |
| `statusUpdatedAt`                                | *string*                                         | :heavy_check_mark:                               | N/A                                              |                                                  |
| `updatedAt`                                      | *string*                                         | :heavy_check_mark:                               | N/A                                              |                                                  |
| `workspaceId`                                    | *string*                                         | :heavy_check_mark:                               | N/A                                              |                                                  |