# EndpointInfo

## Example Usage

```typescript
import { EndpointInfo } from "@openrouter/sdk/models";

let value: EndpointInfo = {
  model: "openai/gpt-4o",
  provider: "OpenAI",
  selected: true,
  sortRank: 0,
  sortValue: 0.005,
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `model`            | *string*           | :heavy_check_mark: | N/A                |
| `provider`         | *string*           | :heavy_check_mark: | N/A                |
| `selected`         | *boolean*          | :heavy_check_mark: | N/A                |
| `sortRank`         | *number*           | :heavy_check_mark: | N/A                |
| `sortValue`        | *number*           | :heavy_check_mark: | N/A                |