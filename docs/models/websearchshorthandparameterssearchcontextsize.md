# WebSearchShorthandParametersSearchContextSize

How much context to retrieve per result. Defaults to medium (15000 chars).

## Example Usage

```typescript
import { WebSearchShorthandParametersSearchContextSize } from "@openrouter/sdk/models";

let value: WebSearchShorthandParametersSearchContextSize = "low";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"low" | "medium" | "high" | Unrecognized<string>
```