# PerRequestLimits

Per-request token limits

## Example Usage

```typescript
import { PerRequestLimits } from "@openrouter/sdk/models";

let value: PerRequestLimits = {
  completionTokens: 1000,
  promptTokens: 1000,
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           | Example                               |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `completionTokens`                    | *number*                              | :heavy_check_mark:                    | Maximum completion tokens per request | 1000                                  |
| `promptTokens`                        | *number*                              | :heavy_check_mark:                    | Maximum prompt tokens per request     | 1000                                  |