# ToolChoiceFunction

Specific function tool choice

## Example Usage

```typescript
import { ToolChoiceFunction } from "@openrouter/sdk/models";

let value: ToolChoiceFunction = {
  type: "function",
  name: "get_weather",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `type`                                               | [models.ToolChoiceType](../models/toolchoicetype.md) | :heavy_check_mark:                                   | N/A                                                  |
| `name`                                               | *string*                                             | :heavy_check_mark:                                   | N/A                                                  |