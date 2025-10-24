# OpenResponsesWebSearch20250826Tool

Web search tool configuration (2025-08-26 version)

## Example Usage

```typescript
import { OpenResponsesWebSearch20250826Tool } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearch20250826Tool = {
  type: "web_search_2025_08_26",
  filters: {
    allowedDomains: [
      "example.com",
    ],
  },
  searchContextSize: "medium",
  userLocation: {
    type: "approximate",
    city: "San Francisco",
    country: "USA",
    region: "California",
    timezone: "America/Los_Angeles",
  },
};
```

## Fields

| Field                                                                                                                           | Type                                                                                                                            | Required                                                                                                                        | Description                                                                                                                     | Example                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                                          | [models.OpenResponsesWebSearch20250826ToolType](../models/openresponseswebsearch20250826tooltype.md)                            | :heavy_check_mark:                                                                                                              | N/A                                                                                                                             |                                                                                                                                 |
| `filters`                                                                                                                       | [models.OpenResponsesWebSearch20250826ToolFilters](../models/openresponseswebsearch20250826toolfilters.md)                      | :heavy_minus_sign:                                                                                                              | N/A                                                                                                                             |                                                                                                                                 |
| `searchContextSize`                                                                                                             | [models.ResponsesSearchContextSize](../models/responsessearchcontextsize.md)                                                    | :heavy_minus_sign:                                                                                                              | Size of the search context for web search tools                                                                                 | medium                                                                                                                          |
| `userLocation`                                                                                                                  | [models.ResponsesWebSearchUserLocation](../models/responseswebsearchuserlocation.md)                                            | :heavy_minus_sign:                                                                                                              | User location information for web search                                                                                        | {<br/>"type": "approximate",<br/>"city": "San Francisco",<br/>"country": "USA",<br/>"region": "California",<br/>"timezone": "America/Los_Angeles"<br/>} |