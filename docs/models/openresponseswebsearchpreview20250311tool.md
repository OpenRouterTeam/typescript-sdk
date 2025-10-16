# OpenResponsesWebSearchPreview20250311Tool

Web search preview tool configuration (2025-03-11 version)

## Example Usage

```typescript
import { OpenResponsesWebSearchPreview20250311Tool } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearchPreview20250311Tool = {
  type: "web_search_preview_2025_03_11",
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

| Field                                                                                                              | Type                                                                                                               | Required                                                                                                           | Description                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                             | [models.OpenResponsesWebSearchPreview20250311ToolType](../models/openresponseswebsearchpreview20250311tooltype.md) | :heavy_check_mark:                                                                                                 | N/A                                                                                                                |
| `searchContextSize`                                                                                                | [models.ResponsesSearchContextSize](../models/responsessearchcontextsize.md)                                       | :heavy_minus_sign:                                                                                                 | Size of the search context for web search tools                                                                    |
| `userLocation`                                                                                                     | [models.ResponsesWebSearchUserLocation](../models/responseswebsearchuserlocation.md)                               | :heavy_minus_sign:                                                                                                 | User location information for web search                                                                           |