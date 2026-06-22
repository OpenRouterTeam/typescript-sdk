# Source

Benchmark source to query. Determines the shape of the returned items. When omitted, returns results from all sources.

## Example Usage

```typescript
import { Source } from "@openrouter/sdk/models/operations";

let value: Source = "artificial-analysis";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"artificial-analysis" | "design-arena" | Unrecognized<string>
```