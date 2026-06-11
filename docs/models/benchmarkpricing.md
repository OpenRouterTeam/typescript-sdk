# BenchmarkPricing

OpenRouter pricing per token for this model. Null if pricing is unavailable.

## Example Usage

```typescript
import { BenchmarkPricing } from "@openrouter/sdk/models";

let value: BenchmarkPricing = {
  completion: "0.000015",
  prompt: "0.000003",
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  | Example                                      |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `completion`                                 | *string*                                     | :heavy_check_mark:                           | Cost per output token (USD, decimal string). | 0.000015                                     |
| `prompt`                                     | *string*                                     | :heavy_check_mark:                           | Cost per input token (USD, decimal string).  | 0.000003                                     |