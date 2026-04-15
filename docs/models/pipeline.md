# Pipeline

## Example Usage

```typescript
import { Pipeline } from "@openrouter/sdk/models";

let value: Pipeline = {
  name: "<value>",
  type: "<value>",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `costUsd`             | *number*              | :heavy_minus_sign:    | N/A                   |
| `data`                | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `durationMs`          | *number*              | :heavy_minus_sign:    | N/A                   |
| `guardrailId`         | *string*              | :heavy_minus_sign:    | N/A                   |
| `guardrailScope`      | *string*              | :heavy_minus_sign:    | N/A                   |
| `name`                | *string*              | :heavy_check_mark:    | N/A                   |
| `type`                | *string*              | :heavy_check_mark:    | N/A                   |