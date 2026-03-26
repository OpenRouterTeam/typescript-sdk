# UpdateKeysLimitReset

New limit reset type for the API key (daily, weekly, monthly, or null for no reset). Resets happen automatically at midnight UTC, and weeks are Monday through Sunday.

## Example Usage

```typescript
import { UpdateKeysLimitReset } from "@openrouter/sdk/models/operations";

let value: UpdateKeysLimitReset = "daily";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"daily" | "weekly" | "monthly" | Unrecognized<string>
```