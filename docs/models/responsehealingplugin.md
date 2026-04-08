# ResponseHealingPlugin

## Example Usage

```typescript
import { ResponseHealingPlugin } from "@openrouter/sdk/models";

let value: ResponseHealingPlugin = {
  id: "response-healing",
};
```

## Fields

| Field                                                                                   | Type                                                                                    | Required                                                                                | Description                                                                             |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `id`                                                                                    | *"response-healing"*                                                                    | :heavy_check_mark:                                                                      | N/A                                                                                     |
| `enabled`                                                                               | *boolean*                                                                               | :heavy_minus_sign:                                                                      | Set to false to disable the response-healing plugin for this request. Defaults to true. |