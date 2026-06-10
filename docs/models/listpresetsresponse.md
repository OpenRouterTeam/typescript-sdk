# ListPresetsResponse

Response containing a list of presets with their designated versions.

## Example Usage

```typescript
import { ListPresetsResponse } from "@openrouter/sdk/models";

let value: ListPresetsResponse = {
  data: [
    {
      createdAt: "2026-04-20T10:00:00Z",
      creatorUserId: "user_2dHFtVWx2n56w6HkM0000000000",
      description: null,
      designatedVersion: {
        config: {
          "model": "openai/gpt-4o",
          "temperature": 0.7,
        },
        createdAt: "2026-04-20T10:00:00Z",
        creatorId: "user_2dHFtVWx2n56w6HkM0000000000",
        id: "550e8400-e29b-41d4-a716-446655440000",
        presetId: "650e8400-e29b-41d4-a716-446655440001",
        systemPrompt: "You are a helpful assistant.",
        updatedAt: "2026-04-20T10:00:00Z",
        version: 1,
      },
      designatedVersionId: "550e8400-e29b-41d4-a716-446655440000",
      id: "650e8400-e29b-41d4-a716-446655440001",
      name: "my-preset",
      slug: "my-preset",
      status: "active",
      statusUpdatedAt: null,
      updatedAt: "2026-04-20T10:00:00Z",
      workspaceId: "750e8400-e29b-41d4-a716-446655440002",
    },
  ],
  totalCount: 1,
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `data`                                                                           | [models.PresetWithDesignatedVersion](../models/presetwithdesignatedversion.md)[] | :heavy_check_mark:                                                               | N/A                                                                              |
| `totalCount`                                                                     | *number*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |