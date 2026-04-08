# ListOrganizationMembersResponseBody

List of organization members

## Example Usage

```typescript
import { ListOrganizationMembersResponseBody } from "@openrouter/sdk/models/operations";

let value: ListOrganizationMembersResponseBody = {
  data: [],
  totalCount: 25,
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        | Example                                                                                            |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `data`                                                                                             | [operations.ListOrganizationMembersData](../../models/operations/listorganizationmembersdata.md)[] | :heavy_check_mark:                                                                                 | List of organization members                                                                       |                                                                                                    |
| `totalCount`                                                                                       | *number*                                                                                           | :heavy_check_mark:                                                                                 | Total number of members in the organization                                                        | 25                                                                                                 |