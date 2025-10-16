# OpenResponsesWebSearchTool

Web search tool configuration

## Example Usage

```typescript
import { OpenResponsesWebSearchTool } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearchTool = {
  type: "web_search",
  filters: {
    allowedDomains: null,
  },
  searchContextSize: "low",
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

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `type`                                                                                     | [models.OpenResponsesWebSearchToolType](../models/openresponseswebsearchtooltype.md)       | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `filters`                                                                                  | [models.OpenResponsesWebSearchToolFilters](../models/openresponseswebsearchtoolfilters.md) | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `searchContextSize`                                                                        | [models.ResponsesSearchContextSize](../models/responsessearchcontextsize.md)               | :heavy_minus_sign:                                                                         | Size of the search context for web search tools                                            |
| `userLocation`                                                                             | [models.ResponsesWebSearchUserLocation](../models/responseswebsearchuserlocation.md)       | :heavy_minus_sign:                                                                         | User location information for web search                                                   |