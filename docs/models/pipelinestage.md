# PipelineStage

## Example Usage

```typescript
import { PipelineStage } from "@openrouter/sdk/models";

let value: PipelineStage = {
  name: "web",
  type: "web_search",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `costUsd`             | *number*              | :heavy_minus_sign:    | N/A                   |
| `data`                | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `guardrailId`         | *string*              | :heavy_minus_sign:    | N/A                   |
| `guardrailScope`      | *string*              | :heavy_minus_sign:    | N/A                   |
| `name`                | *string*              | :heavy_check_mark:    | N/A                   |
| `type`                | *string*              | :heavy_check_mark:    | N/A                   |