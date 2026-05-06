# CreateResponsesXOpenRouterExperimentalMetadata

Opt-in to surface routing metadata on the response under `openrouter_metadata`. Defaults to `off`. The `experimental-metadata` query parameter is honored as a fallback when the header is absent or carries an unrecognized value.

## Example Usage

```typescript
import { CreateResponsesXOpenRouterExperimentalMetadata } from "@openrouter/sdk/models/operations";

let value: CreateResponsesXOpenRouterExperimentalMetadata = "standard";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"off" | "standard" | Unrecognized<string>
```