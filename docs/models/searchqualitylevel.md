# SearchQualityLevel

How much context to retrieve per result. Defaults to medium (15000 chars). Applies to Exa and Parallel engines; ignored with native provider search and Firecrawl.

## Example Usage

```typescript
import { SearchQualityLevel } from "@openrouter/sdk/models";

let value: SearchQualityLevel = "medium";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"low" | "medium" | "high" | Unrecognized<string>
```