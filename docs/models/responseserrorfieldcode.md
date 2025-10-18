# ResponsesErrorFieldCode

## Example Usage

```typescript
import { ResponsesErrorFieldCode } from "@openrouter/sdk/models";

let value: ResponsesErrorFieldCode = "rate_limit_exceeded";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"server_error" | "rate_limit_exceeded" | "invalid_prompt" | "vector_store_timeout" | "invalid_image" | "invalid_image_format" | "invalid_base64_image" | "invalid_image_url" | "image_too_large" | "image_too_small" | "image_parse_error" | "image_content_policy_violation" | "invalid_image_mode" | "image_file_too_large" | "unsupported_image_media_type" | "empty_image_file" | "failed_to_download_image" | "image_file_not_found" | Unrecognized<string>
```