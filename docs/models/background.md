# Background

## Example Usage

```typescript
import { Background } from "@openrouter/sdk/models";

let value: Background = "transparent";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"transparent" | "opaque" | "auto" | Unrecognized<string>
```