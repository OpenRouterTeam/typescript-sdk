# SearchModelsServerToolConfig

Configuration for the openrouter:search_models server tool

## Example Usage

```typescript
import { SearchModelsServerToolConfig } from "@openrouter/sdk/models";

let value: SearchModelsServerToolConfig = {};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `maxResults`                                               | *number*                                                   | :heavy_minus_sign:                                         | Maximum number of models to return. Defaults to 5, max 20. | 5                                                          |