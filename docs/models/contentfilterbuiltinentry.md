# ContentFilterBuiltinEntry

A builtin content filter entry. Builtin filters include PII detectors and the regex-based prompt injection detector.

## Example Usage

```typescript
import { ContentFilterBuiltinEntry } from "@openrouter/sdk/models";

let value: ContentFilterBuiltinEntry = {
  action: "redact",
  slug: "email",
};
```

## Fields

| Field                                                                                                                           | Type                                                                                                                            | Required                                                                                                                        | Description                                                                                                                     | Example                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `action`                                                                                                                        | [models.ContentFilterBuiltinAction](../models/contentfilterbuiltinaction.md)                                                    | :heavy_check_mark:                                                                                                              | Action taken when the builtin filter triggers                                                                                   | block                                                                                                                           |
| `label`                                                                                                                         | *string*                                                                                                                        | :heavy_minus_sign:                                                                                                              | Read-only, system-assigned redaction placeholder derived from the slug (e.g. "[EMAIL]", "[PHONE]"). Not settable by the caller. | [EMAIL]                                                                                                                         |
| `scanScope`                                                                                                                     | [models.PromptInjectionScanScope](../models/promptinjectionscanscope.md)                                                        | :heavy_minus_sign:                                                                                                              | Which message roles to scan for prompt injection. Only applies to the regex-prompt-injection builtin. Defaults to all_messages. | user_only                                                                                                                       |
| `slug`                                                                                                                          | [models.ContentFilterBuiltinSlug](../models/contentfilterbuiltinslug.md)                                                        | :heavy_check_mark:                                                                                                              | The builtin filter identifier                                                                                                   | regex-prompt-injection                                                                                                          |