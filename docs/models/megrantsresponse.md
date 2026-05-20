# MeGrantsResponse

Active grants for the caller.

## Example Usage

```typescript
import { MeGrantsResponse } from "@openrouter/sdk/models";

let value: MeGrantsResponse = {
  data: [
    {
      engineFullName: "acme:web-search",
      engineId: "11111111-2222-3333-4444-555555555555",
      grantedAt: "2025-01-01T00:00:00Z",
      revokedAt: null,
      typeSlug: "openrouter:datetime",
    },
  ],
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `data`                                                             | [models.MeGrantsResponseData](../models/megrantsresponsedata.md)[] | :heavy_check_mark:                                                 | N/A                                                                |