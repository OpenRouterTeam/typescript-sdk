# WebSearchServerToolSearchContextSize

How much context to retrieve per result. Defaults to medium (15000 chars). Only applies when using the Exa engine; ignored with native provider search.

## Example Usage

```typescript
import { WebSearchServerToolSearchContextSize } from "@openrouter/sdk/models";

let value: WebSearchServerToolSearchContextSize = "medium";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"low" | "medium" | "high" | Unrecognized<string>
```