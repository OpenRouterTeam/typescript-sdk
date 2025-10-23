# OpenResponsesWebSearchPreview20250311Tool

Web search preview tool configuration (2025-03-11 version)

## Example Usage

```typescript
import { OpenResponsesWebSearchPreview20250311Tool } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearchPreview20250311Tool = {
  type: "web_search_preview_2025_03_11",
  searchContextSize: "medium",
  userLocation: {
    type: "approximate",
    city: "North Clint",
    country: "Moldova",
    region: "<value>",
    timezone: "Europe/Tirane",
  },
};
```

## Fields

| Field                                                                                                                                                              | Type                                                                                                                                                               | Required                                                                                                                                                           | Description                                                                                                                                                        | Example                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                                                                             | [models.OpenResponsesWebSearchPreview20250311ToolTypeWebSearchPreview20250311](../models/openresponseswebsearchpreview20250311tooltypewebsearchpreview20250311.md) | :heavy_check_mark:                                                                                                                                                 | N/A                                                                                                                                                                |                                                                                                                                                                    |
| `searchContextSize`                                                                                                                                                | [models.ResponsesSearchContextSize](../models/responsessearchcontextsize.md)                                                                                       | :heavy_minus_sign:                                                                                                                                                 | Size of the search context for web search tools                                                                                                                    | medium                                                                                                                                                             |
| `userLocation`                                                                                                                                                     | [models.OpenResponsesWebSearchPreview20250311ToolUserLocation](../models/openresponseswebsearchpreview20250311tooluserlocation.md)                                 | :heavy_minus_sign:                                                                                                                                                 | N/A                                                                                                                                                                |                                                                                                                                                                    |