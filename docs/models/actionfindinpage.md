# ActionFindInPage

## Example Usage

```typescript
import { ActionFindInPage } from "@openrouter/sdk/models";

let value: ActionFindInPage = {
  type: "find_in_page",
  pattern: "<value>",
  url: "https://qualified-king.org",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `type`             | *"find_in_page"*   | :heavy_check_mark: | N/A                |
| `pattern`          | *string*           | :heavy_check_mark: | N/A                |
| `url`              | *string*           | :heavy_check_mark: | N/A                |