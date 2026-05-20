# ToolEngineIdentity

Identity fields for a catalog tool engine.

## Example Usage

```typescript
import { ToolEngineIdentity } from "@openrouter/sdk/models";

let value: ToolEngineIdentity = {
  engineSlug: "web-search",
  fullName: "acme:web-search",
  ownerId: "user_2dHFtVWx2n56w6HkM0000000000",
  ownerKind: "user",
  ownerSlug: "acme",
  reviewStatus: "approved",
  typeSlug: "openrouter:datetime",
  visibility: "private",
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              | Example                                                  |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `engineSlug`                                             | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |                                                          |
| `fullName`                                               | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |                                                          |
| `ownerId`                                                | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |                                                          |
| `ownerKind`                                              | [models.ToolOwnerKind](../models/toolownerkind.md)       | :heavy_check_mark:                                       | Owner kind for a catalog tool engine.                    | user                                                     |
| `ownerSlug`                                              | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |                                                          |
| `reviewStatus`                                           | [models.ToolReviewStatus](../models/toolreviewstatus.md) | :heavy_check_mark:                                       | Marketplace review status for a tool engine.             | approved                                                 |
| `typeSlug`                                               | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |                                                          |
| `visibility`                                             | [models.ToolVisibility](../models/toolvisibility.md)     | :heavy_check_mark:                                       | Catalog visibility level for a tool engine.              | private                                                  |