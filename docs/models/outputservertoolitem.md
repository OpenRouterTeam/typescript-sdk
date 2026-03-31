# OutputServerToolItem

A generic OpenRouter server tool output item

## Example Usage

```typescript
import { OutputServerToolItem } from "@openrouter/sdk/models";

let value: OutputServerToolItem = {
  type: "openrouter:web_search",
  status: "completed",
};
```

## Fields

| Field                                                                             | Type                                                                              | Required                                                                          | Description                                                                       | Example                                                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `type`                                                                            | *string*                                                                          | :heavy_check_mark:                                                                | Server tool type (e.g. openrouter:datetime, openrouter:web_search)                |                                                                                   |
| `id`                                                                              | *string*                                                                          | :heavy_minus_sign:                                                                | N/A                                                                               |                                                                                   |
| `status`                                                                          | [models.OutputServerToolItemStatus](../models/outputservertoolitemstatus.md)      | :heavy_check_mark:                                                                | N/A                                                                               |                                                                                   |
| `additionalProperties`                                                            | Record<string, *any*>                                                             | :heavy_minus_sign:                                                                | N/A                                                                               | {<br/>"type": "openrouter:web_search",<br/>"id": "ws_tmp_abc123",<br/>"status": "completed"<br/>} |