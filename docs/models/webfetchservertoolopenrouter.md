# WebFetchServerToolOpenRouter

OpenRouter built-in server tool: fetches full content from a URL (web page or PDF)

## Example Usage

```typescript
import { WebFetchServerToolOpenRouter } from "@openrouter/sdk/models";

let value: WebFetchServerToolOpenRouter = {
  type: "openrouter:web_fetch",
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `parameters`                                                                                         | [models.WebFetchServerToolOpenRouterParameters](../models/webfetchservertoolopenrouterparameters.md) | :heavy_minus_sign:                                                                                   | N/A                                                                                                  |
| `type`                                                                                               | *"openrouter:web_fetch"*                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |