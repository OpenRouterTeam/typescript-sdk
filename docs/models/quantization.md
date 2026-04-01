# Quantization

## Example Usage

```typescript
import { Quantization } from "@openrouter/sdk/models";

let value: Quantization = "fp16";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"int4" | "int8" | "fp4" | "fp6" | "fp8" | "fp16" | "bf16" | "fp32" | "unknown" | Unrecognized<string>
```