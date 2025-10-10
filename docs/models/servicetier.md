# ServiceTier

## Example Usage

```typescript
import { ServiceTier } from "@openrouter/sdk/models";

let value: ServiceTier = "auto";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"auto" | "default" | "flex" | "priority" | "scale" | Unrecognized<string>
```