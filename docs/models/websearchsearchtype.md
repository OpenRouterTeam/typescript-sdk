# WebSearchSearchType

Search strategy to use. "auto" (default) lets the engine decide. "instant" provides the lowest latency. "fast" uses lower-latency search models. "deep-lite" is lightweight synthesis. "deep" performs in-depth research with synthesis. "deep-reasoning" adds more reasoning. Legacy values "neural" and "keyword" are also accepted. Currently supported by Exa; ignored by other engines.

## Example Usage

```typescript
import { WebSearchSearchType } from "@openrouter/sdk/models";

let value: WebSearchSearchType = "auto";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"auto" | "instant" | "fast" | "deep-lite" | "deep" | "deep-reasoning" | "neural" | "keyword" | Unrecognized<string>
```