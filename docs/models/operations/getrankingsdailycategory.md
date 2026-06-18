# GetRankingsDailyCategory

Restrict to a use-case category (e.g. `programming`, `roleplay`). Sourced from a sampled, upsampled dataset, so `total_tokens` is an estimate and is aggregated weekly. Cannot be combined with `modality`, `context_bucket`, or `language_type`.

## Example Usage

```typescript
import { GetRankingsDailyCategory } from "@openrouter/sdk/models/operations";

let value: GetRankingsDailyCategory = "programming";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"programming" | "roleplay" | "marketing" | "marketing/seo" | "technology" | "science" | "translation" | "legal" | "finance" | "health" | "trivia" | "academia" | Unrecognized<string>
```