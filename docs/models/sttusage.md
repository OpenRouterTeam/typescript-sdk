# STTUsage

Aggregated usage statistics for the request

## Example Usage

```typescript
import { STTUsage } from "@openrouter/sdk/models";

let value: STTUsage = {};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    | Example                                        |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `cost`                                         | *number*                                       | :heavy_minus_sign:                             | Total cost of the request in USD               | 0.000508                                       |
| `inputTokens`                                  | *number*                                       | :heavy_minus_sign:                             | Number of input tokens billed for this request | 83                                             |
| `outputTokens`                                 | *number*                                       | :heavy_minus_sign:                             | Number of output tokens generated              | 30                                             |
| `seconds`                                      | *number*                                       | :heavy_minus_sign:                             | Duration of the input audio in seconds         | 9.2                                            |
| `totalTokens`                                  | *number*                                       | :heavy_minus_sign:                             | Total number of tokens used (input + output)   | 113                                            |