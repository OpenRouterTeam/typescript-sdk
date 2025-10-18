# InstructType

Instruction format type

## Example Usage

```typescript
import { InstructType } from "@openrouter/sdk/models";

let value: InstructType = "chatml";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"none" | "airoboros" | "alpaca" | "alpaca-modif" | "chatml" | "claude" | "code-llama" | "gemma" | "llama2" | "llama3" | "mistral" | "nemotron" | "neural" | "openchat" | "phi3" | "rwkv" | "vicuna" | "zephyr" | "deepseek-r1" | "deepseek-v3.1" | "qwq" | "qwen3" | Unrecognized<string>
```