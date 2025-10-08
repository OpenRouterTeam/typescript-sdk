# UpdateLimitReset

New limit reset type for the API key (daily, weekly, monthly, or null for no reset). Resets happen automatically at midnight UTC, and weeks are Monday through Sunday.

## Example Usage

```typescript
import { UpdateLimitReset } from "@openrouter/sdk/models/operations";

let value: UpdateLimitReset = "daily";
```

## Values

```typescript
"daily" | "weekly" | "monthly"
```