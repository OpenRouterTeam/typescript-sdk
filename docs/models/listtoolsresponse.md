# ListToolsResponse

List of catalog tool engines owned by the caller or scope.

## Example Usage

```typescript
import { ListToolsResponse } from "@openrouter/sdk/models";

let value: ListToolsResponse = {
  data: [
    {
      archivedAt: null,
      category: "search",
      createdAt: "2025-01-01T00:00:00Z",
      description: "A search engine for the Acme Knowledge Base.",
      healthProbe: null,
      identity: {
        engineSlug: "web-search",
        fullName: "acme:web-search",
        ownerId: "user_2dHFtVWx2n56w6HkM0000000000",
        ownerKind: "user",
        ownerSlug: "acme",
        reviewStatus: "approved",
        typeSlug: "openrouter:datetime",
        visibility: "private",
      },
      perRequestOverrideSchema: null,
      pricing: {
        "authorShareBps": 7000,
        "currency": "credits",
        "flatCredits": 100,
        "mode": "per_call",
      },
      registrationParams: {
        "engineExtensionPolicy": "meta-only",
        "maxConcurrency": 100,
      },
      userConfigSchema: null,
    },
  ],
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `data`                                                     | [models.ToolEngineRecord](../models/toolenginerecord.md)[] | :heavy_check_mark:                                         | N/A                                                        |