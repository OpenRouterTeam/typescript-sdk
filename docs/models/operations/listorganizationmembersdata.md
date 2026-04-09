# ListOrganizationMembersData

## Example Usage

```typescript
import { ListOrganizationMembersData } from "@openrouter/sdk/models/operations";

let value: ListOrganizationMembersData = {
  email: "jane.doe@example.com",
  firstName: "Jane",
  id: "user_2dHFtVWx2n56w6HkM0000000000",
  lastName: "Doe",
  role: "org:member",
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        | Example                                            |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `email`                                            | *string*                                           | :heavy_check_mark:                                 | Email address of the member                        | jane.doe@example.com                               |
| `firstName`                                        | *string*                                           | :heavy_check_mark:                                 | First name of the member                           | Jane                                               |
| `id`                                               | *string*                                           | :heavy_check_mark:                                 | User ID of the organization member                 | user_2dHFtVWx2n56w6HkM0000000000                   |
| `lastName`                                         | *string*                                           | :heavy_check_mark:                                 | Last name of the member                            | Doe                                                |
| `role`                                             | [operations.Role](../../models/operations/role.md) | :heavy_check_mark:                                 | Role of the member in the organization             | org:member                                         |