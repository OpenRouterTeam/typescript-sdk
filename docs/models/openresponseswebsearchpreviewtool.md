# OpenResponsesWebSearchPreviewTool

Web search preview tool configuration

## Example Usage

```typescript
import { OpenResponsesWebSearchPreviewTool } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearchPreviewTool = {
  type: "web_search_preview",
  searchContextSize: "medium",
  userLocation: {
    type: "approximate",
    city: "New Amelie",
    country: "Liberia",
    region: null,
    timezone: "Europe/Minsk",
  },
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                                             | [models.OpenResponsesWebSearchPreviewToolTypeWebSearchPreview](../models/openresponseswebsearchpreviewtooltypewebsearchpreview.md) | :heavy_check_mark:                                                                                                                 | N/A                                                                                                                                |                                                                                                                                    |
| `searchContextSize`                                                                                                                | [models.ResponsesSearchContextSize](../models/responsessearchcontextsize.md)                                                       | :heavy_minus_sign:                                                                                                                 | Size of the search context for web search tools                                                                                    | medium                                                                                                                             |
| `userLocation`                                                                                                                     | [models.OpenResponsesWebSearchPreviewToolUserLocation](../models/openresponseswebsearchpreviewtooluserlocation.md)                 | :heavy_minus_sign:                                                                                                                 | N/A                                                                                                                                |                                                                                                                                    |