# OutputDatetimeItem

An openrouter:datetime server tool output item

## Example Usage

```typescript
import { OutputDatetimeItem } from "@openrouter/sdk/models";

let value: OutputDatetimeItem = {
  type: "openrouter:datetime",
  status: "completed",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          | Example                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `type`                                                               | [models.OutputDatetimeItemType](../models/outputdatetimeitemtype.md) | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |
| `id`                                                                 | *string*                                                             | :heavy_minus_sign:                                                   | N/A                                                                  |                                                                      |
| `status`                                                             | [models.ToolCallStatus](../models/toolcallstatus.md)                 | :heavy_check_mark:                                                   | N/A                                                                  | completed                                                            |
| `datetime`                                                           | *string*                                                             | :heavy_minus_sign:                                                   | ISO 8601 datetime string                                             |                                                                      |
| `timezone`                                                           | *string*                                                             | :heavy_minus_sign:                                                   | IANA timezone name                                                   |                                                                      |