# Usage

Token usage statistics

## Example Usage

```typescript
import { Usage } from "@openrouter/sdk/models/operations";

let value: Usage = {
  promptTokens: 8,
  totalTokens: 8,
};
```

## Fields

| Field                          | Type                           | Required                       | Description                    | Example                        |
| ------------------------------ | ------------------------------ | ------------------------------ | ------------------------------ | ------------------------------ |
| `promptTokens`                 | *number*                       | :heavy_check_mark:             | Number of tokens in the input  | 8                              |
| `totalTokens`                  | *number*                       | :heavy_check_mark:             | Total number of tokens used    | 8                              |
| `cost`                         | *number*                       | :heavy_minus_sign:             | Cost of the request in credits | 0.0001                         |