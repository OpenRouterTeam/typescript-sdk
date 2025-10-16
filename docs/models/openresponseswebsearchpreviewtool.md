# OpenResponsesWebSearchPreviewTool

Web search preview tool configuration

## Example Usage

```typescript
import { OpenResponsesWebSearchPreviewTool } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearchPreviewTool = {
  type: "web_search_preview",
  searchContextSize: "high",
  userLocation: {
    type: "approximate",
    city: "Bechtelarstad",
    country: "Bangladesh",
    region: "<value>",
    timezone: "America/Blanc-Sablon",
  },
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `type`                                                                                             | [models.OpenResponsesWebSearchPreviewToolType](../models/openresponseswebsearchpreviewtooltype.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `searchContextSize`                                                                                | [models.ResponsesSearchContextSize](../models/responsessearchcontextsize.md)                       | :heavy_minus_sign:                                                                                 | Size of the search context for web search tools                                                    |
| `userLocation`                                                                                     | [models.ResponsesWebSearchUserLocation](../models/responseswebsearchuserlocation.md)               | :heavy_minus_sign:                                                                                 | User location information for web search                                                           |