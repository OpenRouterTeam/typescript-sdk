# RoutedServiceTier

Non-default service tier of the virtual endpoint the request was routed to. Billing follows the tier reported in the upstream response, which may differ.

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