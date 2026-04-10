# CreateRerankUsage

Usage statistics

## Example Usage

```typescript
import { CreateRerankUsage } from "@openrouter/sdk/models/operations";

let value: CreateRerankUsage = {};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      | Example                                          |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `cost`                                           | *number*                                         | :heavy_minus_sign:                               | Cost of the request in credits                   | 0.001                                            |
| `searchUnits`                                    | *number*                                         | :heavy_minus_sign:                               | Number of search units consumed (Cohere billing) | 1                                                |
| `totalTokens`                                    | *number*                                         | :heavy_minus_sign:                               | Total number of tokens used                      | 150                                              |