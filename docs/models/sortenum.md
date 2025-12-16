# SortEnum

## Example Usage

```typescript
import { SortEnum } from "@openrouter/sdk/models";

let value: SortEnum = "throughput";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"price" | "throughput" | "latency" | Unrecognized<string>
```