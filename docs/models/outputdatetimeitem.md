# OutputDatetimeItem

An openrouter:datetime server tool output item

## Example Usage

```typescript
import { OutputDatetimeItem } from "@openrouter/sdk/models";

let value: OutputDatetimeItem = {
  status: "completed",
  type: "openrouter:datetime",
  datetime: "2026-03-12T14:30:00.000Z",
  timezone: "UTC",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          | Example                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `id`                                                                 | *string*                                                             | :heavy_minus_sign:                                                   | N/A                                                                  |                                                                      |
| `status`                                                             | [models.ToolCallStatus](../models/toolcallstatus.md)                 | :heavy_check_mark:                                                   | N/A                                                                  | completed                                                            |
| `type`                                                               | [models.OutputDatetimeItemType](../models/outputdatetimeitemtype.md) | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |
| `datetime`                                                           | *string*                                                             | :heavy_check_mark:                                                   | ISO 8601 datetime string                                             |                                                                      |
| `timezone`                                                           | *string*                                                             | :heavy_check_mark:                                                   | IANA timezone name                                                   |                                                                      |