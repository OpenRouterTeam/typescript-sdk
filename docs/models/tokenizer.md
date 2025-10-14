# Tokenizer

Tokenizer type used by the model

## Example Usage

```typescript
import { Tokenizer } from "@openrouter/sdk/models";

let value: Tokenizer = "GPT";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"Router" | "Media" | "Other" | "GPT" | "Claude" | "Gemini" | "Grok" | "Cohere" | "Nova" | "Qwen" | "Yi" | "DeepSeek" | "Mistral" | "Llama2" | "Llama3" | "Llama4" | "PaLM" | "RWKV" | "Qwen3" | Unrecognized<string>
```