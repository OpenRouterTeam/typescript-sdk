# AABenchmarkEntry

Artificial Analysis composite index scores. Omitted when no data is available for this model.

## Example Usage

```typescript
import { AABenchmarkEntry } from "@openrouter/sdk/models";

let value: AABenchmarkEntry = {
  agenticIndex: 58.3,
  codingIndex: 65.8,
  intelligenceIndex: 71.2,
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               | Example                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `agenticIndex`                                                            | *number*                                                                  | :heavy_check_mark:                                                        | Artificial Analysis Agentic Index composite score. Higher is better.      | 58.3                                                                      |
| `codingIndex`                                                             | *number*                                                                  | :heavy_check_mark:                                                        | Artificial Analysis Coding Index composite score. Higher is better.       | 65.8                                                                      |
| `intelligenceIndex`                                                       | *number*                                                                  | :heavy_check_mark:                                                        | Artificial Analysis Intelligence Index composite score. Higher is better. | 71.2                                                                      |