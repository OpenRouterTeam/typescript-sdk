# ListOrganizationMembersData

## Example Usage

```typescript
import { ListOrganizationMembersData } from "@openrouter/sdk/models/operations";

let value: ListOrganizationMembersData = {
  id: "user_2dHFtVWx2n56w6HkM0000000000",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  role: "org:member",
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        | Example                                            |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `id`                                               | *string*                                           | :heavy_check_mark:                                 | User ID of the organization member                 | user_2dHFtVWx2n56w6HkM0000000000                   |
| `firstName`                                        | *string*                                           | :heavy_check_mark:                                 | First name of the member                           | Jane                                               |
| `lastName`                                         | *string*                                           | :heavy_check_mark:                                 | Last name of the member                            | Doe                                                |
| `email`                                            | *string*                                           | :heavy_check_mark:                                 | Email address of the member                        | jane.doe@example.com                               |
| `role`                                             | [operations.Role](../../models/operations/role.md) | :heavy_check_mark:                                 | Role of the member in the organization             | org:member                                         |