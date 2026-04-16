# Preset

Preset routing strategy. "balanced" weights all objectives equally, "fast" prioritises low latency, "cheap" prioritises low cost, "quality" prioritises benchmark scores. Defaults depend on the router slug: "quality" for pareto-code, "fast" for pareto-agent. Ignored when explicit objectives are provided.

## Example Usage

```typescript
import { Preset } from "@openrouter/sdk/models";

let value: Preset = "fast";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"balanced" | "fast" | "cheap" | "quality" | "custom" | Unrecognized<string>
```