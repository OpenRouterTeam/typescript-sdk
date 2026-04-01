# WebSearchServerToolEngine

Which search engine to use. "auto" (default) uses native if the provider supports it, otherwise Exa. "native" forces the provider's built-in search. "exa" forces the Exa search API. "firecrawl" uses Firecrawl (requires BYOK). "parallel" uses the Parallel search API.

## Example Usage

```typescript
import { WebSearchServerToolEngine } from "@openrouter/sdk/models";

let value: WebSearchServerToolEngine = "auto";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"auto" | "native" | "exa" | "firecrawl" | "parallel" | Unrecognized<string>
```