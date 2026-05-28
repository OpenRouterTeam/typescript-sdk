# AnthropicCitationCharLocationParam

## Example Usage

```typescript
import { AnthropicCitationCharLocationParam } from "@openrouter/sdk/models";

let value: AnthropicCitationCharLocationParam = {
  citedText: "Example cited text",
  documentIndex: 0,
  documentTitle: null,
  endCharIndex: 18,
  startCharIndex: 0,
  type: "char_location",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `citedText`        | *string*           | :heavy_check_mark: | N/A                |
| `documentIndex`    | *number*           | :heavy_check_mark: | N/A                |
| `documentTitle`    | *string*           | :heavy_check_mark: | N/A                |
| `endCharIndex`     | *number*           | :heavy_check_mark: | N/A                |
| `startCharIndex`   | *number*           | :heavy_check_mark: | N/A                |
| `type`             | *"char_location"*  | :heavy_check_mark: | N/A                |