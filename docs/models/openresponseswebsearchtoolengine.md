# OpenResponsesWebSearchToolEngine

Which search engine to use. "auto" (default) uses native if the provider supports it, otherwise Exa. "native" forces the provider's built-in search. "exa" forces the Exa search API.

## Example Usage

```typescript
import { OpenResponsesWebSearchToolEngine } from "@openrouter/sdk/models";

let value: OpenResponsesWebSearchToolEngine = "auto";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"auto" | "native" | "exa" | Unrecognized<string>
```