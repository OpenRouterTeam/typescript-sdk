# OpenResponsesRequestRoute

Routing strategy for multiple models: "fallback" (default) uses secondary models as backups, "sort" sorts all endpoints together by routing criteria.

## Example Usage

```typescript
import { OpenResponsesRequestRoute } from "@openrouter/sdk/models";

let value: OpenResponsesRequestRoute = "fallback";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"fallback" | "sort" | Unrecognized<string>
```