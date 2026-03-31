# ChatToolCallFunction

## Example Usage

```typescript
import { ChatToolCallFunction } from "@openrouter/sdk/models";

let value: ChatToolCallFunction = {
  name: "<value>",
  arguments: "<value>",
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `name`                            | *string*                          | :heavy_check_mark:                | Function name to call             |
| `arguments`                       | *string*                          | :heavy_check_mark:                | Function arguments as JSON string |