# PerRequestLimits

Per-request token limits

## Example Usage

```typescript
import { PerRequestLimits } from "@openrouter/sdk/models";

let value: PerRequestLimits = {
  promptTokens: 1000,
  completionTokens: 1000,
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           | Example                               |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `promptTokens`                        | *number*                              | :heavy_check_mark:                    | Maximum prompt tokens per request     | 1000                                  |
| `completionTokens`                    | *number*                              | :heavy_check_mark:                    | Maximum completion tokens per request | 1000                                  |