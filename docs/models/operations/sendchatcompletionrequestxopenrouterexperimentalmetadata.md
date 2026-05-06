# SendChatCompletionRequestXOpenRouterExperimentalMetadata

Opt-in to surface routing metadata on the response under `openrouter_metadata`. Defaults to `off`. The `experimental-metadata` query parameter is honored as a fallback when the header is absent or carries an unrecognized value.

## Example Usage

```typescript
import { SendChatCompletionRequestXOpenRouterExperimentalMetadata } from "@openrouter/sdk/models/operations";

let value: SendChatCompletionRequestXOpenRouterExperimentalMetadata =
  "standard";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"off" | "standard" | Unrecognized<string>
```