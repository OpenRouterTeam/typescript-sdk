# ChatGenerationParamsPluginWeb

## Example Usage

```typescript
import { ChatGenerationParamsPluginWeb } from "@openrouter/sdk/models";

let value: ChatGenerationParamsPluginWeb = {
  id: "web",
};
```

## Fields

| Field                                                                             | Type                                                                              | Required                                                                          | Description                                                                       |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `id`                                                                              | *"web"*                                                                           | :heavy_check_mark:                                                                | N/A                                                                               |
| `enabled`                                                                         | *boolean*                                                                         | :heavy_minus_sign:                                                                | Set to false to disable the web-search plugin for this request. Defaults to true. |
| `maxResults`                                                                      | *number*                                                                          | :heavy_minus_sign:                                                                | N/A                                                                               |
| `searchPrompt`                                                                    | *string*                                                                          | :heavy_minus_sign:                                                                | N/A                                                                               |
| `engine`                                                                          | [models.WebSearchEngine](../models/websearchengine.md)                            | :heavy_minus_sign:                                                                | The search engine to use for web search.                                          |