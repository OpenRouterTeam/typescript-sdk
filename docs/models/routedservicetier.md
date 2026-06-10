# RoutedServiceTier

The service tier this request was routed to (e.g. flex, priority). The tier actually applied and billed is determined by the provider response and may differ.

## Example Usage

```typescript
import { RoutedServiceTier } from "@openrouter/sdk/models";

let value: RoutedServiceTier = "priority";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"flex" | "priority" | Unrecognized<string>
```