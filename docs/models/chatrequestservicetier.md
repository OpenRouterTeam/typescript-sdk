# ChatRequestServiceTier

The service tier to use for processing this request.

## Example Usage

```typescript
import { ChatRequestServiceTier } from "@openrouter/sdk/models";

let value: ChatRequestServiceTier = "auto";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"auto" | "default" | "flex" | "priority" | "scale" | Unrecognized<string>
```