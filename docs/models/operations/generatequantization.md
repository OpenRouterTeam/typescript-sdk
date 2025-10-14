# GenerateQuantization

## Example Usage

```typescript
import { GenerateQuantization } from "@openrouter/sdk/models/operations";

let value: GenerateQuantization = "int8";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"int4" | "int8" | "fp4" | "fp6" | "fp8" | "fp16" | "bf16" | "fp32" | "unknown" | Unrecognized<string>
```