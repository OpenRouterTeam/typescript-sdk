# ResponsesRequestStrategy

The selection strategy to apply among filtered candidates (latency-first, quality-first, cost-first, balanced)

## Example Usage

```typescript
import { ResponsesRequestStrategy } from "@openrouter/sdk/models";

let value: ResponsesRequestStrategy = "latency-first";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"latency-first" | "quality-first" | "cost-first" | "balanced" | Unrecognized<string>
```