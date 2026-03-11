# FiltersType

## Example Usage

```typescript
import { FiltersType } from "@openrouter/sdk/models";

let value: FiltersType = "gt";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"eq" | "ne" | "gt" | "gte" | "lt" | "lte" | Unrecognized<string>
```