# Sort

`popular` ranks apps by total token volume inside the date window. `trending` ranks apps by absolute excess token growth: window volume minus the average volume of the three equal-length periods immediately preceding the window. Apps with no excess growth are omitted from `trending` results.

## Example Usage

```typescript
import { Sort } from "@openrouter/sdk/models/operations";

let value: Sort = "popular";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"popular" | "trending" | Unrecognized<string>
```