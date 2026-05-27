# PromptInjectionScanScope

Which message roles to scan for prompt injection. Only applies to the regex-prompt-injection builtin. Defaults to all_messages.

## Example Usage

```typescript
import { PromptInjectionScanScope } from "@openrouter/sdk/models";

let value: PromptInjectionScanScope = "user_only";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"user_only" | "all_messages" | Unrecognized<string>
```