# GetModelsPerRequestLimits

Per-request token limits

## Example Usage

```typescript
import { GetModelsPerRequestLimits } from "@openrouter/sdk/models/operations";

let value: GetModelsPerRequestLimits = {
  promptTokens: "<value>",
  completionTokens: "<value>",
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `promptTokens`                        | *any*                                 | :heavy_check_mark:                    | Maximum prompt tokens per request     |
| `completionTokens`                    | *any*                                 | :heavy_check_mark:                    | Maximum completion tokens per request |