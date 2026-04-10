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

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `parameters`                                                             | [models.DatetimeServerToolConfig](../models/datetimeservertoolconfig.md) | :heavy_minus_sign:                                                       | Configuration for the openrouter:datetime server tool                    | {<br/>"timezone": "America/New_York"<br/>}                               |
| `type`                                                                   | [models.DatetimeServerToolType](../models/datetimeservertooltype.md)     | :heavy_check_mark:                                                       | N/A                                                                      |                                                                          |