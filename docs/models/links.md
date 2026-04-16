# Links

Pagination links

## Example Usage

```typescript
import { Links } from "@openrouter/sdk/models";

let value: Links = {
  next: "/api/v1/models?offset=500&limit=500",
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        | Example                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `next`                                                             | *string*                                                           | :heavy_check_mark:                                                 | URL for the next page of results, or null if this is the last page | /api/v1/models?offset=500&limit=500                                |