# ResponseCachingPlugin

## Example Usage

```typescript
import { ResponseCachingPlugin } from "@openrouter/sdk/models";

let value: ResponseCachingPlugin = {
  id: "response-caching",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `id`                                                                   | *"response-caching"*                                                   | :heavy_check_mark:                                                     | N/A                                                                    |
| `ttlSeconds`                                                           | *number*                                                               | :heavy_minus_sign:                                                     | Cache time-to-live in seconds. Must be between 1 and 86400 (24 hours). |