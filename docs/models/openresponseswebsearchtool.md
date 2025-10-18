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
| `type`                                                                                                                          | [models.OpenResponsesWebSearchToolType](../models/openresponseswebsearchtooltype.md)                                            | :heavy_check_mark:                                                                                                              | N/A                                                                                                                             |                                                                                                                                 |
| `filters`                                                                                                                       | [models.OpenResponsesWebSearchToolFilters](../models/openresponseswebsearchtoolfilters.md)                                      | :heavy_minus_sign:                                                                                                              | N/A                                                                                                                             |                                                                                                                                 |
| `searchContextSize`                                                                                                             | [models.ResponsesSearchContextSize](../models/responsessearchcontextsize.md)                                                    | :heavy_minus_sign:                                                                                                              | Size of the search context for web search tools                                                                                 | medium                                                                                                                          |
| `userLocation`                                                                                                                  | [models.ResponsesWebSearchUserLocation](../models/responseswebsearchuserlocation.md)                                            | :heavy_minus_sign:                                                                                                              | User location information for web search                                                                                        | {<br/>"type": "approximate",<br/>"city": "San Francisco",<br/>"country": "USA",<br/>"region": "California",<br/>"timezone": "America/Los_Angeles"<br/>} |