# ApiErrorType

Canonical OpenRouter error type, stable across all API formats

## Example Usage

```typescript
import { ApiErrorType } from "@openrouter/sdk/models";

let value: ApiErrorType = "rate_limit_exceeded";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"context_length_exceeded" | "max_tokens_exceeded" | "token_limit_exceeded" | "string_too_long" | "authentication" | "permission_denied" | "payment_required" | "rate_limit_exceeded" | "provider_overloaded" | "provider_unavailable" | "invalid_request" | "invalid_prompt" | "not_found" | "precondition_failed" | "payload_too_large" | "unprocessable" | "content_policy_violation" | "refusal" | "invalid_image" | "image_too_large" | "image_too_small" | "unsupported_image_format" | "image_not_found" | "image_download_failed" | "server" | "timeout" | "unmapped" | Unrecognized<string>
```