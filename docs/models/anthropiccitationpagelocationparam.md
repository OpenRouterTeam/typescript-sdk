# AnthropicCitationPageLocationParam

## Example Usage

```typescript
import { AnthropicCitationPageLocationParam } from "@openrouter/sdk/models";

let value: AnthropicCitationPageLocationParam = {
  citedText: "Example cited text",
  documentIndex: 0,
  documentTitle: null,
  endPageNumber: 2,
  startPageNumber: 1,
  type: "page_location",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `citedText`        | *string*           | :heavy_check_mark: | N/A                |
| `documentIndex`    | *number*           | :heavy_check_mark: | N/A                |
| `documentTitle`    | *string*           | :heavy_check_mark: | N/A                |
| `endPageNumber`    | *number*           | :heavy_check_mark: | N/A                |
| `startPageNumber`  | *number*           | :heavy_check_mark: | N/A                |
| `type`             | *"page_location"*  | :heavy_check_mark: | N/A                |