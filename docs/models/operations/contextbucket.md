# ContextBucket

Restrict to requests whose context length falls in this bucket (`1K`, `10K`, `100K`, `1M`, or `10M`). Exact dataset — cannot be combined with `category` or `language_type`.

## Example Usage

```typescript
import { ContextBucket } from "@openrouter/sdk/models/operations";

let value: ContextBucket = "100K";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"1K" | "10K" | "100K" | "1M" | "10M" | Unrecognized<string>
```