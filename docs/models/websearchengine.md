# WebSearchEngine

The search engine to use for web search.

## Example Usage

```typescript
import { WebSearchEngine } from "@openrouter/sdk/models";

let value: WebSearchEngine = "native";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"native" | "exa" | Unrecognized<string>
```