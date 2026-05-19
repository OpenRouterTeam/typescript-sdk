# WebSearchSearchContentType

Content type to return from a web_search call. Pass `image` to enable OpenAI image search; `text` is the default.

## Example Usage

```typescript
import { WebSearchSearchContentType } from "@openrouter/sdk/models";

let value: WebSearchSearchContentType = "image";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"text" | "image" | Unrecognized<string>
```