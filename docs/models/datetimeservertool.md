# DatetimeServerTool

OpenRouter built-in server tool: returns the current date and time

## Example Usage

```typescript
import { DatetimeServerTool } from "@openrouter/sdk/models";

let value: DatetimeServerTool = {
  type: "openrouter:datetime",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                                                           | [models.DatetimeServerToolType](../models/datetimeservertooltype.md)             | :heavy_check_mark:                                                               | N/A                                                                              |
| `parameters`                                                                     | [models.DatetimeServerToolParameters](../models/datetimeservertoolparameters.md) | :heavy_minus_sign:                                                               | N/A                                                                              |