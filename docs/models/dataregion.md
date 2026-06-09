# DataRegion

The data region this generation was routed through. 'europe' for EU-routed requests, 'global' otherwise.

## Example Usage

```typescript
import { DataRegion } from "@openrouter/sdk/models";

let value: DataRegion = "global";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"global" | "europe" | Unrecognized<string>
```