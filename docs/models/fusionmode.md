# FusionMode

Pipeline mode. "full" (default) runs the N-panel + judge pipeline. "fast" routes to a single panel model (the first in analysis_models) without fan-out or judge synthesis — ~3x faster for mechanical turns.

## Example Usage

```typescript
import { FusionMode } from "@openrouter/sdk/models";

let value: FusionMode = "full";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"full" | "fast" | Unrecognized<string>
```