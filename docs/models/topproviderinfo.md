# TopProviderInfo

Information about the top provider for this model

## Example Usage

```typescript
import { TopProviderInfo } from "@openrouter/sdk/models";

let value: TopProviderInfo = {
  contextLength: 8192,
  maxCompletionTokens: 4096,
  isModerated: true,
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     | Example                                         |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `contextLength`                                 | *number*                                        | :heavy_minus_sign:                              | Context length from the top provider            | 8192                                            |
| `maxCompletionTokens`                           | *number*                                        | :heavy_minus_sign:                              | Maximum completion tokens from the top provider | 4096                                            |
| `isModerated`                                   | *boolean*                                       | :heavy_check_mark:                              | Whether the top provider moderates content      | true                                            |