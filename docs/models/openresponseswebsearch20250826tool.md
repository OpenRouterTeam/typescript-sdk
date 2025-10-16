# OpenResponsesWebSearch20250826Tool

Web search tool configuration (2025-08-26 version)

## Example Usage

```typescript
import { OpenResponsesWebSearch20250826Tool } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearch20250826Tool = {
  type: "web_search_2025_08_26",
  filters: {
    allowedDomains: [
      "<value 1>",
      "<value 2>",
      "<value 3>",
    ],
  },
  searchContextSize: "medium",
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

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                     | [models.OpenResponsesWebSearch20250826ToolType](../models/openresponseswebsearch20250826tooltype.md)       | :heavy_check_mark:                                                                                         | N/A                                                                                                        |
| `filters`                                                                                                  | [models.OpenResponsesWebSearch20250826ToolFilters](../models/openresponseswebsearch20250826toolfilters.md) | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |
| `searchContextSize`                                                                                        | [models.ResponsesSearchContextSize](../models/responsessearchcontextsize.md)                               | :heavy_minus_sign:                                                                                         | Size of the search context for web search tools                                                            |
| `userLocation`                                                                                             | [models.ResponsesWebSearchUserLocation](../models/responseswebsearchuserlocation.md)                       | :heavy_minus_sign:                                                                                         | User location information for web search                                                                   |