# AnthropicCitationSearchResultLocation

## Example Usage

```typescript
import { AnthropicCitationSearchResultLocation } from "@openrouter/sdk/models";

let value: AnthropicCitationSearchResultLocation = {
  citedText: "Example cited text",
  endBlockIndex: 1,
  searchResultIndex: 0,
  source: "example_source",
  startBlockIndex: 0,
  title: "Example Result",
  type: "search_result_location",
};
```

## Fields

| Field                      | Type                       | Required                   | Description                |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| `citedText`                | *string*                   | :heavy_check_mark:         | N/A                        |
| `endBlockIndex`            | *number*                   | :heavy_check_mark:         | N/A                        |
| `searchResultIndex`        | *number*                   | :heavy_check_mark:         | N/A                        |
| `source`                   | *string*                   | :heavy_check_mark:         | N/A                        |
| `startBlockIndex`          | *number*                   | :heavy_check_mark:         | N/A                        |
| `title`                    | *string*                   | :heavy_check_mark:         | N/A                        |
| `type`                     | *"search_result_location"* | :heavy_check_mark:         | N/A                        |