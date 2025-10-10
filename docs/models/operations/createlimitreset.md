# CreateLimitReset

Type of limit reset for the API key (daily, weekly, monthly, or null for no reset). Resets happen automatically at midnight UTC, and weeks are Monday through Sunday.

## Example Usage

```typescript
import { CreateLimitReset } from "@openrouter/sdk/models/operations";

let value: CreateLimitReset = "monthly";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"daily" | "weekly" | "monthly" | Unrecognized<string>
```