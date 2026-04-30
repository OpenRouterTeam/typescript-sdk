# UsageBreakdownDuration

Usage breakdown for duration-based billing (e.g. whisper-1)

## Example Usage

```typescript
import { UsageBreakdownDuration } from "@openrouter/sdk/models";

let value: UsageBreakdownDuration = {
  seconds: 9.2,
  type: "duration",
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     | Example                                         |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `cost`                                          | *number*                                        | :heavy_minus_sign:                              | Cost attributed to duration-based billing       | 0.000117                                        |
| `seconds`                                       | *number*                                        | :heavy_check_mark:                              | Duration of the input audio in seconds          | 9.2                                             |
| `type`                                          | *"duration"*                                    | :heavy_check_mark:                              | Breakdown billing type — duration-based billing |                                                 |