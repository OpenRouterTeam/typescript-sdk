# WebSearchShorthandEngine

Which search engine to use. "auto" (default) uses native if the provider supports it, otherwise Exa. "native" forces the provider's built-in search (parameters like max_results, search_context_size, and domain filters are not forwarded to the provider). "exa" forces the Exa search API.

## Example Usage

```typescript
import { WebSearchShorthandEngine } from "@openrouter/sdk/models";

let value: WebSearchShorthandEngine = "auto";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"auto" | "native" | "exa" | Unrecognized<string>
```