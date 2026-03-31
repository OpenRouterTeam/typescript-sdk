# Syntax

## Example Usage

```typescript
import { Syntax } from "@openrouter/sdk/models";

let value: Syntax = "regex";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"lark" | "regex" | Unrecognized<string>
```