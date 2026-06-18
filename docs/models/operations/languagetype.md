# LanguageType

Restrict to natural-language or programming-language tagged activity. Sourced from a sampled, upsampled dataset, so `total_tokens` is an estimate and is aggregated weekly. Cannot be combined with `modality`, `context_bucket`, or `category`.

## Example Usage

```typescript
import { LanguageType } from "@openrouter/sdk/models/operations";

let value: LanguageType = "natural";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"natural" | "programming" | Unrecognized<string>
```