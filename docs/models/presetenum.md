# PresetEnum

A branded OpenRouter fusion preset (slugs follow `or-<task>-<tier>`). Expands server-side into the preset's analysis_models panel and judge model, so callers never name individual models. Explicitly provided `analysis_models` / `model` take precedence.

## Example Usage

```typescript
import { PresetEnum } from "@openrouter/sdk/models";

let value: PresetEnum = "or-coding-high";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"or-general-high" | "or-general-budget" | "or-coding-high" | Unrecognized<string>
```