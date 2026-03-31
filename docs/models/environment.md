# Environment

## Example Usage

```typescript
import { Environment } from "@openrouter/sdk/models";

let value: Environment = "ubuntu";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"windows" | "mac" | "linux" | "ubuntu" | "browser" | Unrecognized<string>
```