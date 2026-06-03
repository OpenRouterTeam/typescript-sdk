# GetBenchmarksArtificialAnalysisCategory

Filter to a single benchmark category. When omitted, returns models ranked by intelligence score.

## Example Usage

```typescript
import { GetBenchmarksArtificialAnalysisCategory } from "@openrouter/sdk/models/operations";

let value: GetBenchmarksArtificialAnalysisCategory = "intelligence";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"intelligence" | "coding" | "agentic" | Unrecognized<string>
```