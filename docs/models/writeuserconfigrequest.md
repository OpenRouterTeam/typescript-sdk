# WriteUserConfigRequest

Request body for writing the caller's per-user config for an engine.

## Example Usage

```typescript
import { WriteUserConfigRequest } from "@openrouter/sdk/models";

let value: WriteUserConfigRequest = {
  config: {
    "apiKey": "sk-acme-...",
  },
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `config`              | Record<string, *any*> | :heavy_check_mark:    | N/A                   |