# MetadataLevel

Opt-in fallback for `X-OpenRouter-Experimental-Metadata`. Same semantics as the header. The header takes precedence when both are present and the header value is valid.

## Example Usage

```typescript
import { MetadataLevel } from "@openrouter/sdk/models";

let value: MetadataLevel = "standard";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"off" | "standard" | Unrecognized<string>
```