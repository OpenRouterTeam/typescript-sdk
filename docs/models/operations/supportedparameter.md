# SupportedParameter

## Example Usage

```typescript
import { SupportedParameter } from "@openrouter/sdk/models/operations";

let value: SupportedParameter = "top_logprobs";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"temperature" | "top_p" | "top_k" | "min_p" | "top_a" | "frequency_penalty" | "presence_penalty" | "repetition_penalty" | "max_tokens" | "logit_bias" | "logprobs" | "top_logprobs" | "seed" | "response_format" | "structured_outputs" | "stop" | "tools" | "tool_choice" | "parallel_tool_calls" | "include_reasoning" | "reasoning" | "web_search_options" | "verbosity" | Unrecognized<string>
```