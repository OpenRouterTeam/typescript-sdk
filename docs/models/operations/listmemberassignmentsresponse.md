# ListMemberAssignmentsResponse

List of member assignments

## Example Usage

```typescript
import { ListMemberAssignmentsResponse } from "@openrouter/sdk/models/operations";

let value: ListMemberAssignmentsResponse = {
  data: [],
  totalCount: 10,
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    | Example                                                                                        |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `data`                                                                                         | [operations.ListMemberAssignmentsData](../../models/operations/listmemberassignmentsdata.md)[] | :heavy_check_mark:                                                                             | List of member assignments                                                                     |                                                                                                |
| `totalCount`                                                                                   | *number*                                                                                       | :heavy_check_mark:                                                                             | Total number of member assignments                                                             | 10                                                                                             |