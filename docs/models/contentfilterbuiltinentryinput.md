# ContentFilterBuiltinEntryInput

A builtin content filter entry for create/update requests. Labels are system-assigned and cannot be set by the caller.

## Example Usage

```typescript
import { ContentFilterBuiltinEntryInput } from "@openrouter/sdk/models";

let value: ContentFilterBuiltinEntryInput = {
  action: "redact",
  slug: "email",
};
```

## Fields

| Field                                                                                                                             | Type                                                                                                                              | Required                                                                                                                          | Description                                                                                                                       | Example                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `action`                                                                                                                          | [models.ContentFilterBuiltinAction](../models/contentfilterbuiltinaction.md)                                                      | :heavy_check_mark:                                                                                                                | Action taken when the builtin filter triggers                                                                                     | block                                                                                                                             |
| `label`                                                                                                                           | *string*                                                                                                                          | :heavy_minus_sign:                                                                                                                | Deprecated: labels are system-assigned and cannot be set by the caller. Accepted for backward compatibility but silently ignored. |                                                                                                                                   |
| `slug`                                                                                                                            | [models.ContentFilterBuiltinSlug](../models/contentfilterbuiltinslug.md)                                                          | :heavy_check_mark:                                                                                                                | The builtin filter identifier                                                                                                     | regex-prompt-injection                                                                                                            |