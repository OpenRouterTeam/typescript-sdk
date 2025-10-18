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
| `type`                                                                                                                          | [models.OpenResponsesWebSearchPreviewToolType](../models/openresponseswebsearchpreviewtooltype.md)                              | :heavy_check_mark:                                                                                                              | N/A                                                                                                                             |                                                                                                                                 |
| `searchContextSize`                                                                                                             | [models.ResponsesSearchContextSize](../models/responsessearchcontextsize.md)                                                    | :heavy_minus_sign:                                                                                                              | Size of the search context for web search tools                                                                                 | medium                                                                                                                          |
| `userLocation`                                                                                                                  | [models.ResponsesWebSearchUserLocation](../models/responseswebsearchuserlocation.md)                                            | :heavy_minus_sign:                                                                                                              | User location information for web search                                                                                        | {<br/>"type": "approximate",<br/>"city": "San Francisco",<br/>"country": "USA",<br/>"region": "California",<br/>"timezone": "America/Los_Angeles"<br/>} |