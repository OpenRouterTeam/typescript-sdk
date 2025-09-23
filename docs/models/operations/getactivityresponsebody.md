# GetActivityResponseBody

Returns user activity data grouped by endpoint

## Example Usage

```typescript
import { GetActivityResponseBody } from "openrouter/models/operations";

let value: GetActivityResponseBody = {
  data: [],
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `data`                                                | [models.ActivityItem](../../models/activityitem.md)[] | :heavy_check_mark:                                    | List of activity items                                |