# Period

Time grain of each row. `day` (default) returns the per-UTC-day series; `week` buckets by ISO week start; `month` buckets by month start. With `category` or `language_type` only `week` (default) and `month` are available — `day` is rejected with a 400 because those datasets are aggregated weekly.

## Example Usage

```typescript
import { Period } from "@openrouter/sdk/models/operations";

let value: Period = "day";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"day" | "week" | "month" | Unrecognized<string>
```