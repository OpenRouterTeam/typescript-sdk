# Preview20250311WebSearchServerToolEngine

Which search engine to use. "auto" (default) uses native if the provider supports it, otherwise Exa. "native" forces the provider's built-in search. "exa" forces the Exa search API. "firecrawl" uses Firecrawl (requires BYOK). "parallel" uses the Parallel search API.

## Example Usage

```typescript
import { Preview20250311WebSearchServerToolEngine } from "@openrouter/sdk/models";

let value: Preview20250311WebSearchServerToolEngine = "auto";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"auto" | "native" | "exa" | "firecrawl" | "parallel" | Unrecognized<string>
```