# WebFetchEngineEnum

Which fetch engine to use. "auto" (default) uses native if the provider supports it, otherwise the OpenRouter engine. "native" forces the provider's built-in fetch. "openrouter" uses direct HTTP fetch. "firecrawl" uses Firecrawl scrape (requires BYOK).

## Example Usage

```typescript
import { WebFetchEngineEnum } from "@openrouter/sdk/models";

let value: WebFetchEngineEnum = "auto";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"auto" | "native" | "openrouter" | "firecrawl" | Unrecognized<string>
```