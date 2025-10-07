# PerRequestLimits

Per-request token limits

## Example Usage

```typescript
import { PerRequestLimits } from "@openrouter/sdk/models";

let value: PerRequestLimits = {
  promptTokens: "<value>",
  completionTokens: "<value>",
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `promptTokens`                        | *any*                                 | :heavy_check_mark:                    | Maximum prompt tokens per request     |
| `completionTokens`                    | *any*                                 | :heavy_check_mark:                    | Maximum completion tokens per request |