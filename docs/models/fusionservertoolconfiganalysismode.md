# FusionServerToolConfigAnalysisMode

Selects how the judge stage synthesizes panel responses. `generic` (default) uses the five research dimensions tuned for one-off UI fusion. `coding` swaps in action-oriented dimensions for multi-turn coding. `council` skips the judge call entirely and returns the raw panel responses.

## Example Usage

```typescript
import { FusionServerToolConfigAnalysisMode } from "@openrouter/sdk/models";

let value: FusionServerToolConfigAnalysisMode = "coding";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"generic" | "coding" | "council" | Unrecognized<string>
```