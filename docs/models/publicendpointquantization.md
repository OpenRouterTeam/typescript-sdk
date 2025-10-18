# PublicEndpointQuantization

## Example Usage

```typescript
import { PublicEndpointQuantization } from "@openrouter/sdk/models";

let value: PublicEndpointQuantization = "fp16";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"int4" | "int8" | "fp4" | "fp6" | "fp8" | "fp16" | "bf16" | "fp32" | "unknown" | Unrecognized<string>
```