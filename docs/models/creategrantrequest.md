# CreateGrantRequest

Request body for granting a user access to a catalog tool engine.

## Example Usage

```typescript
import { CreateGrantRequest } from "@openrouter/sdk/models";

let value: CreateGrantRequest = {
  userId: "user_2dHFtVWx2n56w6HkM0000000000",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `userConfig`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `userId`              | *string*              | :heavy_check_mark:    | N/A                   |