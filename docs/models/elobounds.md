# EloBounds

ELO range across all returned models for normalization.

## Example Usage

```typescript
import { EloBounds } from "@openrouter/sdk/models";

let value: EloBounds = {
  max: 7104.95,
  min: 5476.8,
};
```

## Fields

| Field                          | Type                           | Required                       | Description                    |
| ------------------------------ | ------------------------------ | ------------------------------ | ------------------------------ |
| `max`                          | *number*                       | :heavy_check_mark:             | Maximum ELO in the result set. |
| `min`                          | *number*                       | :heavy_check_mark:             | Minimum ELO in the result set. |