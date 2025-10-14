# SummaryEnum

## Example Usage

```typescript
import { SummaryEnum } from "@openrouter/sdk/models";

let value: SummaryEnum = "detailed";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"auto" | "concise" | "detailed" | Unrecognized<string>
```